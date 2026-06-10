import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  MessageCircle,
  Send,
  Plus,
  Trash2,
  Edit3,
  MoreVertical,
  User,
  Bot,
  Heart,
  BookOpen,
  Sparkles,
  Clock,
  Settings,
  Download,
  Share2,
  AlertTriangle,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';

import {
  chatbotService,
  ChatMessage,
  ChatSession,
} from '@/services/chatbotService';
import { toast } from 'sonner';

const BiblicalChatbot: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [allSessions, setAllSessions] = useState<ChatSession[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sugestões de perguntas bíblicas
  const suggestions = [
    'Como posso me aproximar mais de Deus?',
    'O que a Bíblia diz sobre o perdão?',
    'Como lidar com a ansiedade segundo a Bíblia?',
    'Qual é o propósito da oração em nossa vida?',
    'Como posso crescer espiritualmente?',
    'O que significa ser um verdadeiro cristão?',
  ];

  // Carregar dados iniciais
  useEffect(() => {
    loadSessions();

    // Verificar status da API ao carregar
    const apiStatus = chatbotService.getApiStatus();
    setIsUsingFallback(apiStatus.usingFallback);
  }, []);

  // Scroll automático para o final das mensagens
  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  // Carregar sessões
  const loadSessions = () => {
    const sessions = chatbotService.getAllSessions();
    setAllSessions(sessions);
    const current = chatbotService.getCurrentSession();
    setCurrentSession(current);
    setShowSuggestions(!current || current.messages.length === 0);
  };

  // Scroll para o final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Criar nova sessão
  const createNewSession = () => {
    const session = chatbotService.createSession();
    setCurrentSession(session);
    setShowSuggestions(true);
    loadSessions();
    toast.success('Nova conversa iniciada');
  };

  // Selecionar sessão
  const selectSession = (sessionId: string) => {
    const session = chatbotService.setCurrentSession(sessionId);
    setCurrentSession(session);
    setShowSuggestions(!session || session.messages.length === 0);
  };

  // Deletar sessão
  const deleteSession = (sessionId: string) => {
    if (chatbotService.deleteSession(sessionId)) {
      loadSessions();
      toast.success('Conversa excluída');
    }
  };

  // Renomear sessão
  const startRenaming = (sessionId: string, currentTitle: string) => {
    setIsRenaming(sessionId);
    setRenameValue(currentTitle);
  };

  const finishRenaming = () => {
    if (isRenaming && renameValue.trim()) {
      if (chatbotService.renameSession(isRenaming, renameValue.trim())) {
        loadSessions();
        toast.success('Conversa renomeada');
      }
    }
    setIsRenaming(null);
    setRenameValue('');
  };

  // Enviar mensagem
  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || message;
    if (!textToSend.trim() || isLoading) return;

    setMessage('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const response = await chatbotService.sendMessage(textToSend);
      if (response) {
        const updatedSession = chatbotService.getCurrentSession();
        setCurrentSession(updatedSession);
        loadSessions();

        // Verificar se está usando fallback usando o método do serviço
        const apiStatus = chatbotService.getApiStatus();
        setIsUsingFallback(apiStatus.usingFallback);

        // Se está usando fallback e é a primeira vez, mostrar toast informativo
        if (apiStatus.usingFallback && !isUsingFallback) {
          toast.info(
            'Usando modo offline devido a limitações da API. As respostas são baseadas em conteúdo bíblico pré-programado.'
          );
        }
      }
    } catch (error) {
      toast.error(
        'Erro ao conectar com o Pastor Virtual. Verifique sua conexão e tente novamente.'
      );
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Lidar com Enter no textarea
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Tentar reconectar com a API
  const tryReconnectAPI = async () => {
    chatbotService.resetApiFallback();
    setIsUsingFallback(false);
    toast.success('Tentando reconectar com a API...');

    // Testar a conexão com uma mensagem simples
    try {
      const testResponse = await chatbotService.sendMessage('teste');
      if (testResponse && !chatbotService.isUsingFallback()) {
        toast.success('Conexão com a API restaurada com sucesso!');
      } else {
        setIsUsingFallback(true);
        toast.error(
          'Ainda não foi possível conectar com a API. Verifique sua cota ou tente novamente mais tarde.'
        );
      }
    } catch (error) {
      setIsUsingFallback(true);
      toast.error(
        'Falha ao reconectar com a API. Verifique sua cota ou tente novamente mais tarde.'
      );
    }
  };

  // Obter informações sobre o status da API
  const getApiStatusInfo = () => {
    const apiStatus = chatbotService.getApiStatus();
    const timeSinceLastCall = Date.now() - apiStatus.lastApiCall;
    const minutesSinceLastCall = Math.floor(timeSinceLastCall / (1000 * 60));

    return {
      usingFallback: apiStatus.usingFallback,
      retryCount: apiStatus.retryCount,
      minutesSinceLastCall,
      lastCallTime:
        apiStatus.lastApiCall > 0
          ? new Date(apiStatus.lastApiCall).toLocaleTimeString('pt-BR')
          : 'Nunca',
    };
  };

  // Formatar timestamp
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Formatar data da sessão
  const formatSessionDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  // Exportar conversa
  const exportConversation = () => {
    if (!currentSession) return;

    const content = currentSession.messages
      .map(
        (msg) => `${msg.role === 'user' ? 'Você' : 'Pastor'}: ${msg.content}`
      )
      .join('\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversa-biblica-${currentSession.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Conversa exportada com sucesso');
  };

  return (
    <>
      <Helmet>
        <title>
          Chatbot Bíblico - Orientação Pastoral com IA | Graça e Leitura
        </title>
        <meta
          name='description'
          content='Converse com um pastor evangélico experiente através de IA. Receba orientação bíblica, conselhos espirituais e respostas baseadas nas Escrituras Sagradas.'
        />
        <meta
          name='keywords'
          content='chatbot bíblico, orientação pastoral, IA cristã, conselho espiritual, pastor virtual, orientação bíblica, chat cristão'
        />
        <meta
          property='og:title'
          content='Chatbot Bíblico - Orientação Pastoral com IA'
        />
        <meta
          property='og:description'
          content='Converse com um pastor evangélico experiente através de IA. Receba orientação bíblica e conselhos espirituais.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={window.location.href} />
        <meta
          property='og:image'
          content={`${window.location.origin}/seo.png`}
        />
      </Helmet>

      <div className='container mx-auto p-4 max-w-7xl'>
        {/* Alerta de modo fallback */}
        {isUsingFallback && (
          <Alert className='mb-4 border-orange-200 bg-orange-50'>
            <AlertTriangle className='h-4 w-4 text-orange-600' />
            <AlertDescription className='flex items-center justify-between'>
              <div className='flex-1'>
                <span className='text-orange-800'>
                  <strong>Modo Offline:</strong> O Pastor Virtual está
                  funcionando com respostas baseadas em conteúdo bíblico
                  pré-programado.
                </span>
                <br />
                <span className='text-orange-700 text-sm'>
                  A cota da API foi excedida ou a conexão está temporariamente
                  indisponível. Você pode tentar reconectar ou continuar usando
                  o modo offline.
                </span>
              </div>
              <div className='flex gap-2 ml-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={tryReconnectAPI}
                  className='border-orange-300 text-orange-700 hover:bg-orange-100'
                >
                  <Wifi className='h-3 w-3 mr-1' />
                  Tentar Reconectar
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setIsUsingFallback(false)}
                  className='text-orange-600 hover:bg-orange-100'
                >
                  <X className='h-3 w-3' />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]'>
          {/* Sidebar com histórico de conversas */}
          <div className='lg:col-span-1'>
            <Card className='h-full flex flex-col'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-lg flex items-center gap-2'>
                    <MessageCircle className='h-5 w-5 text-bible-accent' />
                    Conversas
                  </CardTitle>
                  <Button
                    onClick={createNewSession}
                    size='sm'
                    className='bg-bible-accent hover:bg-bible-accent/90'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='flex-1 overflow-hidden p-0'>
                <ScrollArea className='h-full px-4 pb-4'>
                  <div className='space-y-2'>
                    {allSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`group relative p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                          currentSession?.id === session.id
                            ? 'bg-bible-accent/10 border-bible-accent'
                            : 'border-border'
                        }`}
                        onClick={() => selectSession(session.id)}
                      >
                        <div className='flex items-start justify-between'>
                          <div className='flex-1 min-w-0'>
                            {isRenaming === session.id ? (
                              <Input
                                value={renameValue}
                                onChange={(e) => setRenameValue(e.target.value)}
                                onBlur={finishRenaming}
                                onKeyPress={(e) =>
                                  e.key === 'Enter' && finishRenaming()
                                }
                                className='h-6 text-sm'
                                autoFocus
                              />
                            ) : (
                              <h3 className='font-medium text-sm truncate'>
                                {session.title}
                              </h3>
                            )}
                            <p className='text-xs text-muted-foreground mt-1'>
                              {formatSessionDate(session.updatedAt)}
                            </p>
                            {session.messages.length > 0 && (
                              <p className='text-xs text-muted-foreground mt-1 truncate'>
                                {session.messages.length} mensagens
                              </p>
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity'
                              >
                                <MoreVertical className='h-3 w-3' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startRenaming(session.id, session.title);
                                }}
                              >
                                <Edit3 className='h-4 w-4 mr-2' />
                                Renomear
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSession(session.id);
                                }}
                                className='text-destructive'
                              >
                                <Trash2 className='h-4 w-4 mr-2' />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                    {allSessions.length === 0 && (
                      <div className='text-center py-8 text-muted-foreground'>
                        <MessageCircle className='h-12 w-12 mx-auto mb-4 opacity-50' />
                        <p className='text-sm'>Nenhuma conversa ainda</p>
                        <p className='text-xs mt-1'>
                          Clique no botão + para começar
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Área principal do chat */}
          <div className='lg:col-span-3'>
            <Card className='h-full flex flex-col'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                      <Bot className='h-6 w-6 text-bible-accent' />
                      <div>
                        <CardTitle className='text-lg'>
                          Pastor Virtual
                        </CardTitle>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge variant='secondary' className='ml-2'>
                        <Sparkles className='h-3 w-3 mr-1' />
                        IA
                      </Badge>
                      {isUsingFallback && (
                        <Badge
                          variant='outline'
                          className='border-orange-300 text-orange-700'
                        >
                          <WifiOff className='h-3 w-3 mr-1' />
                          Offline
                        </Badge>
                      )}
                    </div>
                  </div>
                  {currentSession && currentSession.messages.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <Settings className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={exportConversation}>
                          <Download className='h-4 w-4 mr-2' />
                          Exportar conversa
                        </DropdownMenuItem>
                        {isUsingFallback && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={tryReconnectAPI}>
                              <Wifi className='h-4 w-4 mr-2' />
                              Tentar Reconectar API
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>

              <CardContent className='flex-1 flex flex-col p-0'>
                {/* Área de mensagens */}
                <ScrollArea className='flex-1 px-4'>
                  <div className='space-y-4 pb-4'>
                    {!currentSession || currentSession.messages.length === 0 ? (
                      <div className='text-center py-8'>
                        <div className='mb-6'>
                          <Heart className='h-16 w-16 mx-auto mb-4 text-bible-accent' />
                          <h3 className='text-xl font-semibold mb-2'>
                            Bem-vindo ao Pastor Virtual
                          </h3>
                          <p className='text-muted-foreground mb-6'>
                            Sou um pastor evangélico com décadas de experiência,
                            aqui para oferecer orientação bíblica e espiritual.
                          </p>
                        </div>

                        {/* Sugestões de perguntas */}
                        {showSuggestions && (
                          <div className='max-w-2xl mx-auto'>
                            <h4 className='text-sm font-medium mb-3 text-muted-foreground'>
                              Perguntas sugeridas:
                            </h4>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                              {suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant='outline'
                                  className='text-left h-auto p-3 justify-start hover:bg-bible-accent/5 hover:border-bible-accent/20'
                                  onClick={() => sendMessage(suggestion)}
                                  disabled={isLoading}
                                >
                                  <span className='text-sm'>{suggestion}</span>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      currentSession.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-3 ${
                            msg.role === 'user'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          {msg.role === 'assistant' && (
                            <div className='flex-shrink-0 w-8 h-8 bg-bible-accent/10 rounded-full flex items-center justify-center'>
                              <Bot className='h-4 w-4 text-bible-accent' />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-3 ${
                              msg.role === 'user'
                                ? 'bg-bible-accent text-white'
                                : 'bg-muted'
                            }`}
                          >
                            <p className='whitespace-pre-wrap'>{msg.content}</p>
                            <p
                              className={`text-xs mt-2 ${
                                msg.role === 'user'
                                  ? 'text-white/70'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {formatTimestamp(msg.timestamp)}
                            </p>
                          </div>
                          {msg.role === 'user' && (
                            <div className='flex-shrink-0 w-8 h-8 bg-bible-accent/10 rounded-full flex items-center justify-center'>
                              <User className='h-4 w-4 text-bible-accent' />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {isLoading && (
                      <div className='flex gap-3 justify-start'>
                        <div className='flex-shrink-0 w-8 h-8 bg-bible-accent/10 rounded-full flex items-center justify-center'>
                          <Bot className='h-4 w-4 text-bible-accent' />
                        </div>
                        <div className='max-w-[80%] rounded-lg px-4 py-3 bg-muted'>
                          <div className='flex items-center gap-2'>
                            <div className='flex gap-1'>
                              <div className='w-2 h-2 bg-bible-accent rounded-full animate-bounce'></div>
                              <div
                                className='w-2 h-2 bg-bible-accent rounded-full animate-bounce'
                                style={{ animationDelay: '0.1s' }}
                              ></div>
                              <div
                                className='w-2 h-2 bg-bible-accent rounded-full animate-bounce'
                                style={{ animationDelay: '0.2s' }}
                              ></div>
                            </div>
                            <span className='text-sm text-muted-foreground'>
                              Pastor está pensando...
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Área de input */}
                <div className='border-t p-4'>
                  <div className='flex gap-2 items-end'>
                    <div className='flex-1'>
                      <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder='Digite sua pergunta bíblica ou pedido de oração...'
                        className='min-h-[50px] max-h-[120px] resize-none'
                        disabled={isLoading}
                      />
                      {/* Status da API */}
                      <div className='flex items-center gap-2 mt-2 text-xs text-muted-foreground'>
                        {isUsingFallback ? (
                          <>
                            <WifiOff className='h-3 w-3 text-orange-500' />
                            <span>
                              Modo offline - respostas baseadas em conteúdo
                              bíblico
                            </span>
                          </>
                        ) : (
                          <>
                            <Wifi className='h-3 w-3 text-green-500' />
                            <span>Conectado à IA avançada</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => sendMessage()}
                      disabled={!message.trim() || isLoading}
                      size='sm'
                      className='bg-bible-accent hover:bg-bible-accent/90 h-[50px] px-4'
                    >
                      <Send className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiblicalChatbot;
