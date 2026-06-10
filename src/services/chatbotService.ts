export interface ChatMessage {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	timestamp: Date;
}

export interface ChatSession {
	id: string;
	title: string;
	messages: ChatMessage[];
	createdAt: Date;
	updatedAt: Date;
}

class ChatbotService {
	private sessions: ChatSession[] = [];
	private currentSessionId: string | null = null;
	private useApiFallback: boolean = false;
	private lastApiCall: number = 0;
	private retryCount: number = 0;
	private maxRetries: number = 3;
	private baseDelay: number = 1000; // 1 second

	constructor() {
		this.loadSessions();
	}

	// Carregar sessões do localStorage
	private loadSessions(): void {
		try {
			const saved = localStorage.getItem('bible_chat_sessions');
			if (saved) {
				const parsed = JSON.parse(saved);
				this.sessions = parsed.map((session: ChatSession) => ({
					...session,
					createdAt: new Date(session.createdAt),
					updatedAt: new Date(session.updatedAt),
					messages: session.messages.map((msg: ChatMessage) => ({
						...msg,
						timestamp: new Date(msg.timestamp),
					})),
				}));
			}
		} catch (error) {
			this.sessions = [];
		}
	}

	// Salvar sessões no localStorage
	private saveSessions(): void {
		try {
			localStorage.setItem(
				'bible_chat_sessions',
				JSON.stringify(this.sessions),
			);
		} catch (error) {
			console.error('Erro ao salvar sessões:', error);
		}
	}

	// Criar nova sessão
	createSession(title?: string): ChatSession {
		const session: ChatSession = {
			id: this.generateId(),
			title: title || 'Nova Conversa',
			messages: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.sessions.unshift(session);
		this.currentSessionId = session.id;
		this.saveSessions();

		return session;
	}

	// Obter sessão atual
	getCurrentSession(): ChatSession | null {
		if (!this.currentSessionId) return null;
		return this.sessions.find((s) => s.id === this.currentSessionId) || null;
	}

	// Definir sessão atual
	setCurrentSession(sessionId: string): ChatSession | null {
		const session = this.sessions.find((s) => s.id === sessionId);
		if (session) {
			this.currentSessionId = sessionId;
			return session;
		}
		return null;
	}

	// Obter todas as sessões
	getAllSessions(): ChatSession[] {
		return [...this.sessions].sort(
			(a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
		);
	}

	// Deletar sessão
	deleteSession(sessionId: string): boolean {
		const index = this.sessions.findIndex((s) => s.id === sessionId);
		if (index !== -1) {
			this.sessions.splice(index, 1);
			if (this.currentSessionId === sessionId) {
				this.currentSessionId = null;
			}
			this.saveSessions();
			return true;
		}
		return false;
	}

	// Renomear sessão
	renameSession(sessionId: string, newTitle: string): boolean {
		const session = this.sessions.find((s) => s.id === sessionId);
		if (session) {
			session.title = newTitle;
			session.updatedAt = new Date();
			this.saveSessions();
			return true;
		}
		return false;
	}

	// Adicionar mensagem à sessão atual
	addMessage(content: string, role: 'user' | 'assistant'): ChatMessage | null {
		const session = this.getCurrentSession();
		if (!session) return null;

		const message: ChatMessage = {
			id: this.generateId(),
			role,
			content,
			timestamp: new Date(),
		};

		session.messages.push(message);
		session.updatedAt = new Date();

		// Atualizar título da sessão baseado na primeira mensagem do usuário
		if (role === 'user' && session.messages.length === 1) {
			session.title =
				content.length > 50 ? content.substring(0, 50) + '...' : content;
		}

		this.saveSessions();
		return message;
	}

	// Enviar mensagem para a IA
	async sendMessage(message: string): Promise<ChatMessage | null> {
		if (!message.trim()) return null;

		// Garantir que há uma sessão atual
		let session = this.getCurrentSession();
		if (!session) {
			session = this.createSession();
		}

		// Adicionar mensagem do usuário
		const userMessage = this.addMessage(message, 'user');
		if (!userMessage) return null;

		try {
			let aiResponse: string;

			// Tentar usar a API real primeiro, se falhar usar fallback
			if (!this.useApiFallback) {
				try {
					// Implementar rate limiting
					await this.waitForRateLimit();
					aiResponse = await this.generateAIResponse(message, session.messages);
					this.retryCount = 0; // Reset retry count on success
				} catch (error: unknown) {
					const errorMessage =
						error instanceof Error ? error.message : String(error);

					// Verificar se é erro de quota (429)
					if (errorMessage.includes('429') || errorMessage.includes('quota')) {
						this.useApiFallback = true;
						aiResponse = this.generateFallbackResponse(message);

						// Adicionar mensagem informativa sobre o status
						const quotaMessage = this.addMessage(
							'⚠️ A cota da API foi excedida. Estou funcionando com respostas baseadas em conteúdo bíblico pré-programado. Você pode tentar novamente mais tarde.',
							'assistant',
						);
					} else {
						// Para outros erros, tentar retry com backoff exponencial
						if (this.retryCount < this.maxRetries) {
							this.retryCount++;
							const delay = this.baseDelay * Math.pow(2, this.retryCount - 1);

							await new Promise((resolve) => setTimeout(resolve, delay));
							aiResponse = await this.generateAIResponse(
								message,
								session.messages,
							);
							this.retryCount = 0; // Reset on success
						} else {
							this.useApiFallback = true;
							aiResponse = this.generateFallbackResponse(message);
						}
					}
				}
			} else {
				aiResponse = this.generateFallbackResponse(message);
			}

			// Adicionar resposta da IA
			const assistantMessage = this.addMessage(aiResponse, 'assistant');
			return assistantMessage;
		} catch (error) {
			// Adicionar mensagem de erro
			const errorMessage = this.addMessage(
				'Peço desculpas, mas ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.',
				'assistant',
			);
			return errorMessage;
		}
	}

	// Implementar rate limiting para evitar 429
	private async waitForRateLimit(): Promise<void> {
		const now = Date.now();
		const timeSinceLastCall = now - this.lastApiCall;
		const minInterval = 1000; // Mínimo 1 segundo entre chamadas

		if (timeSinceLastCall < minInterval) {
			const waitTime = minInterval - timeSinceLastCall;
			await new Promise((resolve) => setTimeout(resolve, waitTime));
		}

		this.lastApiCall = Date.now();
	}

	// Gerar resposta da IA usando nova API de Responses do OpenAI
	private async generateAIResponse(
		message: string,
		conversationHistory: ChatMessage[],
	): Promise<string> {
		const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

		if (!apiKey) {
			throw new Error(
				'Chave da API OpenAI não configurada. Defina VITE_OPENAI_API_KEY no ambiente de build.',
			);
		}

		// Contexto do pastor evangélico
		const systemPrompt = `Você é um pastor evangélico experiente com 80 anos de ministério e profundo conhecimento bíblico. 
    Responda sempre com base nas Escrituras Sagradas, oferecendo orientação espiritual, conforto e sabedoria bíblica.
    Seja compassivo, sábio e sempre direcione as respostas para os ensinamentos de Jesus Cristo e da Bíblia.
    Não use emojis em suas respostas. Mantenha um tom respeitoso e pastoral.
    Cite versículos bíblicos quando apropriado e ofereça conselhos práticos baseados na fé cristã.
    Suas respostas devem ser edificantes, consoladoras e sempre apontando para Cristo.`;

		// Preparar input para a nova API de Responses
		const inputMessages = [
			// Adicionar histórico da conversa (últimas 10 mensagens para não exceder limite)
			...conversationHistory.slice(-10).map((msg) => ({
				role: msg.role === 'user' ? 'user' : 'assistant',
				content: [
					{
						type: 'input_text',
						text: msg.content,
					},
				],
			})),
			{
				role: 'user',
				content: [
					{
						type: 'input_text',
						text: message,
					},
				],
			},
		];

		const response = await fetch('https://api.openai.com/v1/responses', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'gpt-4o',
				instructions: systemPrompt,
				input: inputMessages,
				max_output_tokens: 1000,
				temperature: 0.7,
				text: {
					format: {
						type: 'text',
					},
				},
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			const errorMessage = errorData.error?.message || 'Erro desconhecido';

			// Tratamento específico para diferentes códigos de erro
			if (response.status === 429) {
				throw new Error(`Quota excedida: ${errorMessage}`);
			} else if (response.status === 401) {
				throw new Error(`Erro de autenticação: ${errorMessage}`);
			} else if (response.status === 403) {
				throw new Error(`Acesso negado: ${errorMessage}`);
			} else if (response.status >= 500) {
				throw new Error(`Erro do servidor: ${errorMessage}`);
			} else {
				throw new Error(`Erro da API: ${response.status} - ${errorMessage}`);
			}
		}

		const data = await response.json();

		// Extrair resposta da nova estrutura da API
		if (
			!data.output ||
			!data.output[0] ||
			!data.output[0].content ||
			!data.output[0].content[0] ||
			!data.output[0].content[0].text
		) {
			throw new Error('Resposta inválida da API');
		}

		return data.output[0].content[0].text.trim();
	}

	// Sistema de fallback com respostas simuladas baseadas em conteúdo bíblico
	private generateFallbackResponse(message: string): string {
		const lowerMessage = message.toLowerCase();

		// Respostas baseadas em palavras-chave bíblicas
		const responses = {
			// Temas de fé e relacionamento com Deus
			aproximar: `Meu querido irmão, aproximar-se de Deus é o desejo mais nobre do coração humano. Como nos ensina Tiago 4:8: "Chegai-vos a Deus, e ele se chegará a vós."

Para se aproximar do Senhor, recomendo:
- Dedique tempo diário à oração e meditação na Palavra
- Busque um coração contrito e humilde diante do Altíssimo
- Pratique a obediência aos mandamentos divinos
- Cultive a comunhão com outros irmãos na fé

Lembre-se das palavras de Jesus em João 14:6: "Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim."`,

			perdão: `O perdão é um dos pilares fundamentais da fé cristã, meu caro irmão. Como nos ensina Efésios 4:32: "Antes sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo."

O Senhor Jesus nos ensinou no Pai Nosso: "Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores" (Mateus 6:12).

O perdão não é apenas um mandamento, mas uma libertação para nossa própria alma. Quando perdoamos, somos libertos do peso do ressentimento e da amargura.

Colossenses 3:13 nos exorta: "Suportando-vos uns aos outros e perdoando-vos uns aos outros, se alguém tiver queixa contra outro; assim como Cristo vos perdoou, assim fazei vós também."`,

			ansiedade: `Meu querido filho, a ansiedade é um fardo que muitos carregam nestes tempos difíceis. Mas o Senhor nos oferece paz que excede todo entendimento.

Como nos ensina Filipenses 4:6-7: "Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplicas, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus."

Jesus mesmo nos disse em Mateus 6:26: "Olhai para as aves do céu, que não semeiam, nem segam, nem ajuntam em celeiros; e vosso Pai celestial as alimenta. Não tendes vós muito mais valor do que elas?"

Entregue suas preocupações ao Senhor, pois Ele cuida de você com amor infinito.`,

			oração: `A oração é o respirar da alma cristã, meu irmão. É nossa comunicação direta com o Pai celestial.

Como nos ensina 1 Tessalonicenses 5:17: "Orai sem cessar." E Jesus nos deu o exemplo perfeito de vida de oração.

Lucas 11:9-10 nos promete: "E eu vos digo: Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á. Porque qualquer que pede recebe; e quem busca encontra; e a quem bate abrir-se-lhe-á."

A oração nos conecta com Deus, fortalece nossa fé, traz paz ao coração e nos alinha com a vontade divina. É através da oração que encontramos direção, consolo e poder para enfrentar os desafios da vida.`,

			crescer: `O crescimento espiritual é uma jornada contínua, meu caro irmão. Como nos ensina 2 Pedro 3:18: "Antes, crescei na graça e conhecimento de nosso Senhor e Salvador Jesus Cristo."

Para crescer espiritualmente:
- Alimente-se diariamente da Palavra de Deus
- Mantenha uma vida de oração constante
- Busque a comunhão com outros cristãos
- Pratique o amor e o serviço ao próximo
- Permita que o Espírito Santo trabalhe em seu coração

Filipenses 1:6 nos assegura: "Tendo por certo isto mesmo: que aquele que em vós começou a boa obra a aperfeiçoará até ao Dia de Jesus Cristo."`,

			cristão: `Ser um verdadeiro cristão vai além de simplesmente professar a fé, meu irmão. É viver como Cristo viveu.

1 João 2:6 nos ensina: "Aquele que diz que está nele também deve andar como ele andou."

Um verdadeiro cristão:
- Ama a Deus sobre todas as coisas
- Ama ao próximo como a si mesmo
- Busca viver em santidade
- Pratica a justiça e a misericórdia
- Testemunha do amor de Cristo através de suas ações

Gálatas 2:20 resume bem: "Já estou crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim; e a vida que agora vivo na carne vivo-a na fé do Filho de Deus, o qual me amou e se entregou a si mesmo por mim."`,

			default: `Paz seja contigo, meu caro irmão. Agradeço por compartilhar sua pergunta comigo.

Embora cada situação seja única, sempre encontramos orientação na Palavra de Deus. Como nos ensina Salmos 119:105: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."

Encorajo você a buscar ao Senhor em oração, meditar nas Escrituras e buscar a orientação do Espírito Santo. Ele é fiel para nos guiar em toda verdade.

Que Deus abençoe sua jornada e lhe conceda sabedoria e paz. Estou aqui para ajudá-lo no que for necessário.`,
		};

		// Verificar palavras-chave na mensagem
		for (const [keyword, response] of Object.entries(responses)) {
			if (keyword !== 'default' && lowerMessage.includes(keyword)) {
				return response;
			}
		}

		// Verificar temas relacionados
		if (
			lowerMessage.includes('deus') ||
			lowerMessage.includes('senhor') ||
			lowerMessage.includes('jesus')
		) {
			return responses.aproximar;
		}

		if (
			lowerMessage.includes('medo') ||
			lowerMessage.includes('preocup') ||
			lowerMessage.includes('stress')
		) {
			return responses.ansiedade;
		}

		if (
			lowerMessage.includes('bíblia') ||
			lowerMessage.includes('palavra') ||
			lowerMessage.includes('escritura')
		) {
			return `A Palavra de Deus é nosso alimento espiritual, meu irmão. Como nos ensina Hebreus 4:12: "Porque a palavra de Deus é viva, e eficaz, e mais penetrante do que qualquer espada de dois gumes."

Josué 1:8 nos exorta: "Não se aparte da tua boca o livro desta Lei; antes, medita nele de dia e de noite, para que tenhas cuidado de fazer conforme tudo quanto nele está escrito; porque, então, farás prosperar o teu caminho e, então, prudentemente te conduzirás."

Dedique tempo diário para ler e meditar nas Escrituras. Elas são a fonte de sabedoria, correção e edificação para nossa vida cristã.`;
		}

		return responses.default;
	}

	// Gerar ID único
	private generateId(): string {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}

	// Limpar todas as sessões
	clearAllSessions(): void {
		this.sessions = [];
		this.currentSessionId = null;
		localStorage.removeItem('bible_chat_sessions');
	}

	// Método para resetar o fallback (útil para tentar a API novamente)
	resetApiFallback(): void {
		this.useApiFallback = false;
		this.retryCount = 0;
	}

	// Método para verificar se está usando fallback
	isUsingFallback(): boolean {
		return this.useApiFallback;
	}

	// Método para obter informações sobre o status da API
	getApiStatus(): {
		usingFallback: boolean;
		retryCount: number;
		lastApiCall: number;
	} {
		return {
			usingFallback: this.useApiFallback,
			retryCount: this.retryCount,
			lastApiCall: this.lastApiCall,
		};
	}
}

export const chatbotService = new ChatbotService();
