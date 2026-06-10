export interface ThematicReading {
  reference: string;
  theme: string;
  description?: string;
}

export interface ThematicPlan {
  id: string;
  name: string;
  description: string;
  readings: ThematicReading[];
  icon: string;
}

export const thematicPlans: ThematicPlan[] = [
  {
    id: 'ansiedade',
    name: 'Ansiedade',
    description: 'Versículos e passagens que trazem paz e alívio para momentos de ansiedade',
    icon: 'heart',
    readings: [
      { reference: 'Filipenses 4:6-7', theme: 'ansiedade', description: 'Não se preocupem com nada' },
      { reference: 'Mateus 6:25-34', theme: 'ansiedade', description: 'Não se preocupem com o amanhã' },
      { reference: '1 Pedro 5:7', theme: 'ansiedade', description: 'Lancem sobre ele toda a sua ansiedade' },
      { reference: 'Isaías 41:10', theme: 'ansiedade', description: 'Não temam, pois eu estou com vocês' },
      { reference: 'Salmos 23', theme: 'ansiedade', description: 'O Senhor é o meu pastor' },
      { reference: 'João 14:27', theme: 'ansiedade', description: 'A paz que Jesus deixa' },
      { reference: 'Salmos 46:1-3', theme: 'ansiedade', description: 'Deus é o nosso refúgio' },
      { reference: 'Provérbios 3:5-6', theme: 'ansiedade', description: 'Confie no Senhor de todo o coração' },
      { reference: '2 Coríntios 12:9', theme: 'ansiedade', description: 'A graça de Deus é suficiente' },
      { reference: 'Romanos 8:28', theme: 'ansiedade', description: 'Todas as coisas cooperam para o bem' },
      { reference: 'Salmos 55:22', theme: 'ansiedade', description: 'Entregue suas preocupações ao Senhor' },
      { reference: 'Isaías 26:3', theme: 'ansiedade', description: 'Paz perfeita' },
      { reference: 'Salmos 94:19', theme: 'ansiedade', description: 'Consolações do Senhor' },
      { reference: 'João 16:33', theme: 'ansiedade', description: 'No mundo tereis aflições' },
      { reference: 'Salmos 139:23-24', theme: 'ansiedade', description: 'Sonda-me, ó Deus' }
    ]
  },
  {
    id: 'sabedoria',
    name: 'Sabedoria',
    description: 'Passagens que oferecem sabedoria divina para decisões e vida prática',
    icon: 'bulb',
    readings: [
      { reference: 'Provérbios 1:1-7', theme: 'sabedoria', description: 'O propósito dos provérbios' },
      { reference: 'Tiago 1:5-8', theme: 'sabedoria', description: 'Pedindo sabedoria a Deus' },
      { reference: 'Provérbios 2:1-11', theme: 'sabedoria', description: 'Os benefícios da sabedoria' },
      { reference: '1 Reis 3:5-14', theme: 'sabedoria', description: 'A sabedoria de Salomão' },
      { reference: 'Provérbios 4:1-13', theme: 'sabedoria', description: 'Adquira sabedoria' },
      { reference: 'Eclesiastes 3:1-8', theme: 'sabedoria', description: 'Há tempo para tudo' },
      { reference: 'Provérbios 27:17', theme: 'sabedoria', description: 'Ferro afia ferro' },
      { reference: '1 Coríntios 1:18-31', theme: 'sabedoria', description: 'A sabedoria de Deus vs. a do mundo' },
      { reference: 'Provérbios 16:3', theme: 'sabedoria', description: 'Entregue seus planos ao Senhor' },
      { reference: 'Colossenses 2:2-3', theme: 'sabedoria', description: 'Tesouros de sabedoria em Cristo' },
      { reference: 'Provérbios 9:10', theme: 'sabedoria', description: 'O temor do Senhor é o princípio da sabedoria' },
      { reference: 'Provérbios 3:13-18', theme: 'sabedoria', description: 'Bem-aventurado o homem que acha sabedoria' },
      { reference: 'Provérbios 8:10-21', theme: 'sabedoria', description: 'A sabedoria é melhor que o ouro' },
      { reference: 'Eclesiastes 7:11-12', theme: 'sabedoria', description: 'A sabedoria é uma defesa' },
      { reference: 'Provérbios 19:20', theme: 'sabedoria', description: 'Ouça conselhos e aceite instruções' }
    ]
  },
  {
    id: 'relacionamentos',
    name: 'Relacionamentos',
    description: 'Orientações bíblicas para relacionamentos saudáveis e amorosos',
    icon: 'heart',
    readings: [
      { reference: '1 Coríntios 13:1-13', theme: 'relacionamentos', description: 'O amor verdadeiro' },
      { reference: 'Efésios 4:29-32', theme: 'relacionamentos', description: 'Palavras que edificam' },
      { reference: 'Colossenses 3:12-17', theme: 'relacionamentos', description: 'Vestindo-se de amor' },
      { reference: 'Romanos 12:9-21', theme: 'relacionamentos', description: 'O amor sincero' },
      { reference: 'Provérbios 17:17', theme: 'relacionamentos', description: 'O amigo verdadeiro' },
      { reference: 'Eclesiastes 4:9-12', theme: 'relacionamentos', description: 'Melhor é serem dois' },
      { reference: 'João 15:12-17', theme: 'relacionamentos', description: 'Amai-vos uns aos outros' },
      { reference: '1 João 4:7-21', theme: 'relacionamentos', description: 'Deus é amor' },
      { reference: 'Efésios 5:21-33', theme: 'relacionamentos', description: 'Relacionamento matrimonial' },
      { reference: 'Filipenses 2:1-11', theme: 'relacionamentos', description: 'Humildade e consideração' },
      { reference: 'Provérbios 18:24', theme: 'relacionamentos', description: 'Amigo mais chegado que irmão' },
      { reference: '1 Pedro 4:8-10', theme: 'relacionamentos', description: 'Amor cobre multidão de pecados' },
      { reference: 'Gálatas 6:1-5', theme: 'relacionamentos', description: 'Levai as cargas uns dos outros' },
      { reference: 'Hebreus 10:24-25', theme: 'relacionamentos', description: 'Consideremo-nos uns aos outros' },
      { reference: 'Romanos 15:1-7', theme: 'relacionamentos', description: 'Agradar ao próximo' }
    ]
  },
  {
    id: 'esperanca',
    name: 'Esperança',
    description: 'Versículos que renovam a esperança e fortalecem a fé',
    icon: 'bulb',
    readings: [
      { reference: 'Romanos 15:13', theme: 'esperança', description: 'O Deus da esperança' },
      { reference: 'Jeremias 29:11', theme: 'esperança', description: 'Planos de esperança e futuro' },
      { reference: 'Lamentações 3:21-26', theme: 'esperança', description: 'As misericórdias do Senhor' },
      { reference: 'Isaías 40:28-31', theme: 'esperança', description: 'Renovação das forças' },
      { reference: 'Romanos 8:18-25', theme: 'esperança', description: 'A esperança da glória futura' },
      { reference: 'Hebreus 6:17-20', theme: 'esperança', description: 'Âncora da alma' },
      { reference: '1 Pedro 1:3-9', theme: 'esperança', description: 'Esperança viva' },
      { reference: 'Salmos 42:5-11', theme: 'esperança', description: 'Espera em Deus' },
      { reference: 'Apocalipse 21:1-5', theme: 'esperança', description: 'Novas todas as coisas' },
      { reference: '2 Coríntios 4:16-18', theme: 'esperança', description: 'Renovação interior' },
      { reference: 'Salmos 130:5-7', theme: 'esperança', description: 'Espero no Senhor' },
      { reference: 'Isaías 61:1-3', theme: 'esperança', description: 'Óleo de alegria em vez de pranto' },
      { reference: 'Salmos 71:14', theme: 'esperança', description: 'Esperarei continuamente' },
      { reference: 'Romanos 5:1-5', theme: 'esperança', description: 'A esperança não decepciona' },
      { reference: 'Jeremias 31:16-17', theme: 'esperança', description: 'Há esperança para o seu futuro' }
    ]
  },
  {
    id: 'fe',
    name: 'Fé',
    description: 'Passagens que fortalecem e edificam a fé cristã',
    icon: 'heart',
    readings: [
      { reference: 'Hebreus 11:1-6', theme: 'fé', description: 'A definição da fé' },
      { reference: 'Romanos 10:17', theme: 'fé', description: 'A fé vem pelo ouvir' },
      { reference: 'Marcos 9:14-29', theme: 'fé', description: 'Tudo é possível ao que crê' },
      { reference: 'Mateus 17:14-21', theme: 'fé', description: 'Fé como grão de mostarda' },
      { reference: 'Tiago 2:14-26', theme: 'fé', description: 'Fé sem obras é morta' },
      { reference: 'Hebreus 12:1-3', theme: 'fé', description: 'Correndo com perseverança' },
      { reference: 'Romanos 1:16-17', theme: 'fé', description: 'O justo viverá pela fé' },
      { reference: 'Efésios 2:8-10', theme: 'fé', description: 'Salvos pela fé' },
      { reference: '2 Coríntios 5:7', theme: 'fé', description: 'Andamos por fé' },
      { reference: '1 João 5:1-5', theme: 'fé', description: 'A vitória que vence o mundo' },
      { reference: 'Lucas 17:5-6', theme: 'fé', description: 'Aumenta-nos a fé' },
      { reference: 'Mateus 14:22-33', theme: 'fé', description: 'Pedro anda sobre as águas' },
      { reference: 'Habacuque 2:4', theme: 'fé', description: 'O justo pela fé viverá' },
      { reference: '1 Pedro 1:6-9', theme: 'fé', description: 'Fé provada como ouro' },
      { reference: 'Romanos 4:16-22', theme: 'fé', description: 'A fé de Abraão' }
    ]
  },
  {
    id: 'perdao',
    name: 'Perdão',
    description: 'Ensinamentos sobre perdoar e ser perdoado',
    icon: 'heart',
    readings: [
      { reference: 'Mateus 6:9-15', theme: 'perdão', description: 'O Pai Nosso e o perdão' },
      { reference: 'Lucas 23:32-34', theme: 'perdão', description: 'Jesus perdoa na cruz' },
      { reference: 'Efésios 4:31-32', theme: 'perdão', description: 'Perdoando uns aos outros' },
      { reference: 'Mateus 18:21-35', theme: 'perdão', description: 'A parábola do servo implacável' },
      { reference: 'Colossenses 3:13', theme: 'perdão', description: 'Como Cristo perdoou' },
      { reference: '1 João 1:8-10', theme: 'perdão', description: 'Confissão e perdão' },
      { reference: 'Lucas 15:11-32', theme: 'perdão', description: 'O filho pródigo' },
      { reference: 'Isaías 43:25', theme: 'perdão', description: 'Deus apaga as transgressões' },
      { reference: 'Salmos 103:8-14', theme: 'perdão', description: 'A compaixão do Senhor' },
      { reference: 'Romanos 8:1-4', theme: 'perdão', description: 'Nenhuma condenação' },
      { reference: 'Miquéias 7:18-19', theme: 'perdão', description: 'Quem é Deus como tu?' },
      { reference: 'Atos 3:19', theme: 'perdão', description: 'Arrependam-se para serem perdoados' },
      { reference: '2 Coríntios 2:5-11', theme: 'perdão', description: 'Perdão e restauração' },
      { reference: 'Marcos 11:25-26', theme: 'perdão', description: 'Perdoem para serem perdoados' },
      { reference: 'Hebreus 8:12', theme: 'perdão', description: 'Não me lembrarei mais dos seus pecados' }
    ]
  },
  {
    id: 'gratidao',
    name: 'Gratidão',
    description: 'Versículos que ensinam sobre gratidão e ação de graças',
    icon: 'heart',
    readings: [
      { reference: '1 Tessalonicenses 5:16-18', theme: 'gratidão', description: 'Em tudo dai graças' },
      { reference: 'Salmos 100', theme: 'gratidão', description: 'Entrem com ação de graças' },
      { reference: 'Colossenses 3:15-17', theme: 'gratidão', description: 'Sejam agradecidos' },
      { reference: 'Filipenses 4:4-6', theme: 'gratidão', description: 'Regozijem-se sempre' },
      { reference: 'Salmos 107:1-9', theme: 'gratidão', description: 'Deem graças ao Senhor' },
      { reference: 'Efésios 5:19-20', theme: 'gratidão', description: 'Dando sempre graças' },
      { reference: 'Salmos 118:1-4', theme: 'gratidão', description: 'A bondade do Senhor dura para sempre' },
      { reference: 'Lucas 17:11-19', theme: 'gratidão', description: 'Os dez leprosos' },
      { reference: 'Salmos 136:1-9', theme: 'gratidão', description: 'Sua misericórdia dura para sempre' },
      { reference: '2 Coríntios 9:10-15', theme: 'gratidão', description: 'Graças a Deus pelo seu dom indizível' },
      { reference: 'Salmos 95:1-7', theme: 'gratidão', description: 'Venham, cantemos de alegria' },
      { reference: '1 Crônicas 16:8-18', theme: 'gratidão', description: 'Deem graças ao Senhor' },
      { reference: 'Salmos 103:1-5', theme: 'gratidão', description: 'Bendize, ó minha alma' },
      { reference: 'Daniel 2:20-23', theme: 'gratidão', description: 'A oração de gratidão de Daniel' },
      { reference: 'Apocalipse 7:11-12', theme: 'gratidão', description: 'Ação de graças diante do trono' }
    ]
  },
  {
    id: 'coragem',
    name: 'Coragem',
    description: 'Passagens que inspiram coragem e força para enfrentar desafios',
    icon: 'bulb',
    readings: [
      { reference: 'Josué 1:6-9', theme: 'coragem', description: 'Seja forte e corajoso' },
      { reference: 'Deuteronômio 31:6-8', theme: 'coragem', description: 'Não temam nem se apavorem' },
      { reference: '1 Coríntios 16:13-14', theme: 'coragem', description: 'Sejam vigilantes, permaneçam firmes' },
      { reference: 'Salmos 27:1-6', theme: 'coragem', description: 'O Senhor é a minha luz' },
      { reference: 'Isaías 41:13', theme: 'coragem', description: 'Não tema, eu o ajudo' },
      { reference: 'Filipenses 4:13', theme: 'coragem', description: 'Tudo posso naquele que me fortalece' },
      { reference: '2 Timóteo 1:7', theme: 'coragem', description: 'Espírito de poder' },
      { reference: 'Salmos 118:5-6', theme: 'coragem', description: 'O Senhor está comigo' },
      { reference: 'Efésios 6:10-18', theme: 'coragem', description: 'A armadura de Deus' },
      { reference: 'Daniel 3:16-18', theme: 'coragem', description: 'A coragem de Sadraque, Mesaque e Abede-Nego' },
      { reference: '1 Samuel 17:45-47', theme: 'coragem', description: 'Davi enfrenta Golias' },
      { reference: 'Atos 4:13-20', theme: 'coragem', description: 'A coragem dos apóstolos' },
      { reference: 'Hebreus 13:5-6', theme: 'coragem', description: 'O Senhor é meu ajudador' },
      { reference: 'Salmos 56:3-4', theme: 'coragem', description: 'Quando temo, confio em ti' },
      { reference: 'Provérbios 28:1', theme: 'coragem', description: 'O justo é ousado como leão' }
    ]
  },
  {
    id: 'paz',
    name: 'Paz',
    description: 'Versículos sobre paz interior e paz com Deus',
    icon: 'heart',
    readings: [
      { reference: 'João 14:27', theme: 'paz', description: 'A paz que Jesus deixa' },
      { reference: 'Filipenses 4:6-7', theme: 'paz', description: 'A paz que excede todo entendimento' },
      { reference: 'Isaías 26:3', theme: 'paz', description: 'Paz perfeita' },
      { reference: 'Romanos 5:1', theme: 'paz', description: 'Paz com Deus' },
      { reference: 'Salmos 29:11', theme: 'paz', description: 'O Senhor abençoa com paz' },
      { reference: 'Colossenses 3:15', theme: 'paz', description: 'A paz de Cristo' },
      { reference: 'João 16:33', theme: 'paz', description: 'Em mim tenham paz' },
      { reference: 'Números 6:24-26', theme: 'paz', description: 'A bênção sacerdotal' },
      { reference: 'Salmos 4:8', theme: 'paz', description: 'Em paz me deito e durmo' },
      { reference: 'Isaías 55:10-12', theme: 'paz', description: 'Sairão com alegria e paz' },
      { reference: 'Romanos 8:6', theme: 'paz', description: 'A mente controlada pelo Espírito é vida e paz' },
      { reference: 'Efésios 2:14-18', theme: 'paz', description: 'Cristo é a nossa paz' },
      { reference: 'Salmos 85:8', theme: 'paz', description: 'Deus fala de paz' },
      { reference: 'Hebreus 12:14', theme: 'paz', description: 'Busquem a paz com todos' },
      { reference: 'Mateus 5:9', theme: 'paz', description: 'Bem-aventurados os pacificadores' }
    ]
  },
  {
    id: 'provisao',
    name: 'Provisão',
    description: 'Passagens sobre a provisão e cuidado de Deus',
    icon: 'bulb',
    readings: [
      { reference: 'Filipenses 4:19', theme: 'provisão', description: 'Deus suprirá todas as necessidades' },
      { reference: 'Mateus 6:25-34', theme: 'provisão', description: 'Não se preocupem com o amanhã' },
      { reference: 'Salmos 23', theme: 'provisão', description: 'O Senhor é o meu pastor' },
      { reference: '2 Coríntios 9:8', theme: 'provisão', description: 'Deus pode fazer abundar toda graça' },
      { reference: 'Salmos 37:25', theme: 'provisão', description: 'Nunca vi o justo desamparado' },
      { reference: 'Mateus 14:13-21', theme: 'provisão', description: 'A multiplicação dos pães' },
      { reference: '1 Reis 17:8-16', theme: 'provisão', description: 'A viúva de Sarepta' },
      { reference: 'Salmos 84:11', theme: 'provisão', description: 'Nenhum bem negará' },
      { reference: 'Lucas 12:22-31', theme: 'provisão', description: 'Considerem os corvos' },
      { reference: 'Deuteronômio 8:7-10', theme: 'provisão', description: 'Uma terra boa' },
      { reference: 'Salmos 104:10-16', theme: 'provisão', description: 'Deus cuida da criação' },
      { reference: 'Gênesis 22:8-14', theme: 'provisão', description: 'O Senhor proverá' },
      { reference: 'Isaías 55:10-11', theme: 'provisão', description: 'A palavra não voltará vazia' },
      { reference: 'Romanos 8:32', theme: 'provisão', description: 'Nos dará todas as coisas' },
      { reference: 'Salmos 145:15-16', theme: 'provisão', description: 'Satisfaz todo ser vivente' }
    ]
  },
  {
    id: 'familia',
    name: 'Família',
    description: 'Orientações bíblicas para a vida familiar',
    icon: 'heart',
    readings: [
      { reference: 'Efésios 5:22-33', theme: 'família', description: 'Maridos e esposas' },
      { reference: 'Efésios 6:1-4', theme: 'família', description: 'Filhos e pais' },
      { reference: 'Colossenses 3:18-21', theme: 'família', description: 'Regras para a família' },
      { reference: 'Deuteronômio 6:4-9', theme: 'família', description: 'Ensine a seus filhos' },
      { reference: 'Provérbios 22:6', theme: 'família', description: 'Instrua a criança' },
      { reference: '1 Pedro 3:1-7', theme: 'família', description: 'Deveres conjugais' },
      { reference: 'Josué 24:15', theme: 'família', description: 'Eu e a minha casa serviremos ao Senhor' },
      { reference: 'Salmos 127:1-5', theme: 'família', description: 'Os filhos são herança do Senhor' },
      { reference: 'Tito 2:3-5', theme: 'família', description: 'Mulheres mais velhas ensinem as mais novas' },
      { reference: '1 Timóteo 5:3-8', theme: 'família', description: 'Cuidar da família' },
      { reference: 'Gênesis 2:18-25', theme: 'família', description: 'Instituição do casamento' },
      { reference: 'Malaquias 2:13-16', theme: 'família', description: 'Deus odeia o divórcio' },
      { reference: 'Provérbios 31:10-31', theme: 'família', description: 'A esposa virtuosa' },
      { reference: '1 Coríntios 7:2-5', theme: 'família', description: 'Deveres matrimoniais' },
      { reference: 'Marcos 10:6-9', theme: 'família', description: 'O que Deus ajuntou' }
    ]
  },
  {
    id: 'trabalho',
    name: 'Trabalho',
    description: 'Princípios bíblicos para o trabalho e carreira',
    icon: 'bulb',
    readings: [
      { reference: 'Colossenses 3:23-24', theme: 'trabalho', description: 'Trabalhem de todo o coração' },
      { reference: 'Efésios 6:5-9', theme: 'trabalho', description: 'Servos e senhores' },
      { reference: '2 Tessalonicenses 3:6-12', theme: 'trabalho', description: 'Quem não trabalha, não coma' },
      { reference: 'Provérbios 14:23', theme: 'trabalho', description: 'Todo trabalho traz proveito' },
      { reference: 'Eclesiastes 3:9-13', theme: 'trabalho', description: 'Dom de Deus' },
      { reference: '1 Tessalonicenses 4:11-12', theme: 'trabalho', description: 'Trabalhem com as próprias mãos' },
      { reference: 'Provérbios 6:6-11', theme: 'trabalho', description: 'Vai ter com a formiga' },
      { reference: 'Gênesis 2:15', theme: 'trabalho', description: 'Para lavrar e guardar' },
      { reference: 'Provérbios 22:29', theme: 'trabalho', description: 'Hábil no seu trabalho' },
      { reference: '1 Coríntios 15:58', theme: 'trabalho', description: 'Sempre abundantes na obra do Senhor' },
      { reference: 'Provérbios 16:3', theme: 'trabalho', description: 'Entregue ao Senhor suas obras' },
      { reference: 'Eclesiastes 9:10', theme: 'trabalho', description: 'Faça com toda a sua força' },
      { reference: 'Tito 3:14', theme: 'trabalho', description: 'Aprendam a dedicar-se às boas obras' },
      { reference: 'Provérbios 31:13-19', theme: 'trabalho', description: 'Trabalha com prazer' },
      { reference: '1 Pedro 4:10-11', theme: 'trabalho', description: 'Sirvam uns aos outros' }
    ]
  },
  {
    id: 'alegria',
    name: 'Alegria',
    description: 'Versículos que trazem alegria e renovam o ânimo para celebrar a vida',
    icon: 'heart',
    readings: [
      { reference: 'Salmos 16:11', theme: 'alegria', description: 'Alegria na presença de Deus' },
      { reference: 'Filipenses 4:4', theme: 'alegria', description: 'Alegrem-se sempre no Senhor' },
      { reference: 'Neemias 8:10', theme: 'alegria', description: 'A alegria do Senhor é a nossa força' },
      { reference: 'Salmos 126:2-3', theme: 'alegria', description: 'Nossa boca se encheu de riso' },
      { reference: 'João 15:11', theme: 'alegria', description: 'Para que a minha alegria esteja em vocês' },
      { reference: 'Salmos 30:5', theme: 'alegria', description: 'De manhã vem a alegria' },
      { reference: '1 Pedro 1:8', theme: 'alegria', description: 'Alegria indizível e cheia de glória' },
      { reference: 'Isaías 12:2-3', theme: 'alegria', description: 'Com alegria tirarão água' },
      { reference: 'Salmos 32:11', theme: 'alegria', description: 'Alegrem-se no Senhor' },
      { reference: 'Habacuque 3:17-18', theme: 'alegria', description: 'Eu me alegrarei no Senhor' },
      { reference: 'Lucas 15:7', theme: 'alegria', description: 'Alegria no céu' },
      { reference: 'Salmos 118:24', theme: 'alegria', description: 'Este é o dia que o Senhor fez' },
      { reference: 'Isaías 61:3', theme: 'alegria', description: 'Óleo de alegria em vez de pranto' },
      { reference: 'Romanos 14:17', theme: 'alegria', description: 'Alegria no Espírito Santo' },
      { reference: 'Salmos 97:11', theme: 'alegria', description: 'Luz e alegria para os justos' }
    ]
  },
  {
    id: 'depressao',
    name: 'Superando a Depressão',
    description: 'Passagens de conforto e esperança para momentos de tristeza profunda',
    icon: 'heart',
    readings: [
      { reference: 'Salmos 42:11', theme: 'depressão', description: 'Por que estás abatida, ó minha alma?' },
      { reference: 'Isaías 61:1-3', theme: 'depressão', description: 'Consolar os que choram' },
      { reference: 'Salmos 34:18', theme: 'depressão', description: 'Perto está o Senhor dos quebrantados' },
      { reference: '2 Coríntios 1:3-4', theme: 'depressão', description: 'Deus de toda consolação' },
      { reference: 'Salmos 147:3', theme: 'depressão', description: 'Sara os quebrantados de coração' },
      { reference: 'Mateus 11:28-30', theme: 'depressão', description: 'Venham a mim os cansados' },
      { reference: 'Salmos 30:11', theme: 'depressão', description: 'Converteste o meu pranto em dança' },
      { reference: 'Romanos 8:18', theme: 'depressão', description: 'Os sofrimentos não se comparam à glória' },
      { reference: 'Salmos 40:1-3', theme: 'depressão', description: 'Tirou-me do poço da perdição' },
      { reference: 'Isaías 43:2', theme: 'depressão', description: 'Quando passares pelas águas' },
      { reference: 'Salmos 23:4', theme: 'depressão', description: 'Ainda que eu ande pelo vale' },
      { reference: '2 Coríntios 4:8-9', theme: 'depressão', description: 'Atribulados, mas não angustiados' },
      { reference: 'Salmos 77:11-12', theme: 'depressão', description: 'Lembrar-me-ei das obras do Senhor' },
      { reference: 'João 16:22', theme: 'depressão', description: 'A vossa tristeza se converterá em alegria' },
      { reference: 'Salmos 139:23-24', theme: 'depressão', description: 'Sonda-me e conhece o meu coração' }
    ]
  },
  {
    id: 'autoestima',
    name: 'Autoestima e Identidade',
    description: 'Versículos sobre valor pessoal e identidade em Cristo',
    icon: 'heart',
    readings: [
      { reference: 'Salmos 139:13-16', theme: 'autoestima', description: 'Sou fearmente e maravilhosamente feito' },
      { reference: 'Efésios 2:10', theme: 'autoestima', description: 'Somos obra de Deus' },
      { reference: '1 Pedro 2:9', theme: 'autoestima', description: 'Raça eleita, sacerdócio real' },
      { reference: 'Jeremias 1:5', theme: 'autoestima', description: 'Antes que nascesses, te conheci' },
      { reference: 'Romanos 8:37', theme: 'autoestima', description: 'Mais que vencedores' },
      { reference: '2 Coríntios 5:17', theme: 'autoestima', description: 'Nova criatura em Cristo' },
      { reference: 'João 1:12', theme: 'autoestima', description: 'Filhos de Deus' },
      { reference: 'Efésios 1:4-6', theme: 'autoestima', description: 'Escolhidos antes da fundação do mundo' },
      { reference: 'Isaías 43:4', theme: 'autoestima', description: 'És precioso aos meus olhos' },
      { reference: 'Zacarias 2:8', theme: 'autoestima', description: 'A menina dos seus olhos' },
      { reference: '1 João 3:1', theme: 'autoestima', description: 'Que grande amor nos deu o Pai' },
      { reference: 'Romanos 5:8', theme: 'autoestima', description: 'Deus demonstra seu amor por nós' },
      { reference: 'Gálatas 2:20', theme: 'autoestima', description: 'Cristo vive em mim' },
      { reference: 'Filipenses 1:6', theme: 'autoestima', description: 'Aquele que começou boa obra' },
      { reference: 'Colossenses 3:12', theme: 'autoestima', description: 'Eleitos de Deus, santos e amados' }
    ]
  },
  {
    id: 'proposito',
    name: 'Propósito de Vida',
    description: 'Passagens sobre descobrir e viver o propósito divino',
    icon: 'bulb',
    readings: [
      { reference: 'Jeremias 29:11', theme: 'propósito', description: 'Planos de paz e não de mal' },
      { reference: 'Romanos 8:28', theme: 'propósito', description: 'Todas as coisas cooperam para o bem' },
      { reference: 'Efésios 2:10', theme: 'propósito', description: 'Criados para boas obras' },
      { reference: 'Provérbios 19:21', theme: 'propósito', description: 'O propósito do Senhor permanecerá' },
      { reference: 'Eclesiastes 3:1', theme: 'propósito', description: 'Tudo tem o seu tempo' },
      { reference: '1 Coríntios 10:31', theme: 'propósito', description: 'Fazei tudo para glória de Deus' },
      { reference: 'Provérbios 16:9', theme: 'propósito', description: 'O coração do homem planeja' },
      { reference: 'Colossenses 3:23', theme: 'propósito', description: 'Tudo o que fizerdes' },
      { reference: 'Isaías 55:8-9', theme: 'propósito', description: 'Meus pensamentos não são os vossos' },
      { reference: 'Filipenses 2:13', theme: 'propósito', description: 'Deus opera em vós' },
      { reference: 'Atos 17:26-27', theme: 'propósito', description: 'Determinou tempos e lugares' },
      { reference: 'Romanos 12:2', theme: 'propósito', description: 'Renovação da mente' },
      { reference: '2 Timóteo 1:9', theme: 'propósito', description: 'Chamados segundo o seu propósito' },
      { reference: 'Salmos 37:4', theme: 'propósito', description: 'Deleita-te no Senhor' },
      { reference: 'Provérbios 3:5-6', theme: 'propósito', description: 'Confia no Senhor' }
    ]
  },
  {
    id: 'solidao',
    name: 'Solidão',
    description: 'Conforto e companhia divina para momentos de solidão',
    icon: 'heart',
    readings: [
      { reference: 'Hebreus 13:5', theme: 'solidão', description: 'Nunca te deixarei nem te desampararei' },
      { reference: 'Salmos 27:10', theme: 'solidão', description: 'Quando pai e mãe me desampararem' },
      { reference: 'Isaías 41:10', theme: 'solidão', description: 'Não temas, porque eu sou contigo' },
      { reference: 'Mateus 28:20', theme: 'solidão', description: 'Estou convosco todos os dias' },
      { reference: 'Deuteronômio 31:6', theme: 'solidão', description: 'Não te deixará nem te desamparará' },
      { reference: 'Salmos 68:6', theme: 'solidão', description: 'Deus faz que o solitário viva em família' },
      { reference: 'João 14:18', theme: 'solidão', description: 'Não vos deixarei órfãos' },
      { reference: 'Salmos 139:7-10', theme: 'solidão', description: 'Para onde fugirei da tua presença?' },
      { reference: '1 Reis 19:9-18', theme: 'solidão', description: 'Elias no deserto' },
      { reference: 'Salmos 25:16', theme: 'solidão', description: 'Solitário e aflito' },
      { reference: 'Isaías 43:2', theme: 'solidão', description: 'Quando passares pelas águas' },
      { reference: 'Romanos 8:38-39', theme: 'solidão', description: 'Nada nos separará do amor de Deus' },
      { reference: 'Salmos 23:4', theme: 'solidão', description: 'Tu estás comigo' },
      { reference: 'João 16:32', theme: 'solidão', description: 'Não estou só, porque o Pai está comigo' },
      { reference: 'Salmos 46:1', theme: 'solidão', description: 'Deus é o nosso refúgio' }
    ]
  },
  {
    id: 'redes-sociais',
    name: 'Sabedoria Digital',
    description: 'Orientações bíblicas para o uso saudável da tecnologia e redes sociais',
    icon: 'bulb',
    readings: [
      { reference: '1 Coríntios 10:23-24', theme: 'redes-sociais', description: 'Nem tudo convém' },
      { reference: 'Filipenses 4:8', theme: 'redes-sociais', description: 'Pensai nas coisas que são verdadeiras' },
      { reference: 'Provérbios 27:14', theme: 'redes-sociais', description: 'Palavras em hora imprópria' },
      { reference: 'Tiago 1:19', theme: 'redes-sociais', description: 'Tardio para falar' },
      { reference: 'Efésios 4:29', theme: 'redes-sociais', description: 'Nenhuma palavra torpe' },
      { reference: 'Provérbios 18:21', theme: 'redes-sociais', description: 'A vida e a morte estão no poder da língua' },
      { reference: 'Mateus 12:36', theme: 'redes-sociais', description: 'Palavra ociosa' },
      { reference: 'Colossenses 4:6', theme: 'redes-sociais', description: 'Vossa palavra seja sempre agradável' },
      { reference: '1 Tessalonicenses 5:11', theme: 'redes-sociais', description: 'Edificai-vos uns aos outros' },
      { reference: 'Provérbios 16:24', theme: 'redes-sociais', description: 'Palavras suaves são como favos de mel' },
      { reference: 'Romanos 14:19', theme: 'redes-sociais', description: 'Sigamos as coisas que servem para a paz' },
      { reference: '1 Pedro 3:10', theme: 'redes-sociais', description: 'Refreie a sua língua do mal' },
      { reference: 'Provérbios 10:19', theme: 'redes-sociais', description: 'Na multidão de palavras não falta pecado' },
      { reference: 'Gálatas 6:1', theme: 'redes-sociais', description: 'Restaurai com espírito de mansidão' },
      { reference: 'Eclesiastes 3:7', theme: 'redes-sociais', description: 'Tempo de estar calado e tempo de falar' }
    ]
  },
  {
    id: 'stress',
    name: 'Estresse e Pressão',
    description: 'Alívio e descanso para momentos de pressão e estresse',
    icon: 'heart',
    readings: [
      { reference: 'Mateus 11:28-30', theme: 'stress', description: 'Venham a mim, todos os que estão cansados' },
      { reference: 'Salmos 55:22', theme: 'stress', description: 'Entrega o teu caminho ao Senhor' },
      { reference: '1 Pedro 5:7', theme: 'stress', description: 'Lançando sobre ele toda a vossa ansiedade' },
      { reference: 'Filipenses 4:6-7', theme: 'stress', description: 'Não andeis ansiosos por coisa alguma' },
      { reference: 'Isaías 26:3', theme: 'stress', description: 'Tu conservarás em paz' },
      { reference: 'Salmos 46:10', theme: 'stress', description: 'Aquietai-vos e sabei que eu sou Deus' },
      { reference: '2 Coríntios 12:9', theme: 'stress', description: 'A minha graça te basta' },
      { reference: 'Salmos 62:1-2', theme: 'stress', description: 'Só em Deus a minha alma espera' },
      { reference: 'João 14:27', theme: 'stress', description: 'Deixo-vos a paz' },
      { reference: 'Romanos 8:28', theme: 'stress', description: 'Todas as coisas contribuem juntamente para o bem' },
      { reference: 'Salmos 37:7', theme: 'stress', description: 'Descansa no Senhor' },
      { reference: 'Isaías 40:31', theme: 'stress', description: 'Os que esperam no Senhor renovarão as forças' },
      { reference: 'Salmos 121:1-2', theme: 'stress', description: 'O meu socorro vem do Senhor' },
      { reference: 'Provérbios 3:5-6', theme: 'stress', description: 'Confia no Senhor' },
      { reference: 'Hebreus 4:9-10', theme: 'stress', description: 'Resta um repouso para o povo de Deus' }
    ]
  }
];

export const getThematicPlan = (themeId: string): ThematicPlan | undefined => {
  return thematicPlans.find(plan => plan.id === themeId);
};

export const getThematicPlanNames = (): { id: string; name: string }[] => {
  return thematicPlans.map(plan => ({ id: plan.id, name: plan.name }));
};
