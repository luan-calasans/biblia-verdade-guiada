// Mapeamento centralizado de versões da Bíblia
export const versionNameMap: Record<string, string> = {
  // Versões em Português
  acf: 'Almeida Corrigida Fiel',
  arc: 'Almeida Revisada e Corrigida', 
  ntlh: 'Nova Tradução na Linguagem de Hoje',
  nvi: 'Nova Versão Internacional',
  nvt: 'Nova Versão Transformadora',
  naa: 'Nova Almeida Atualizada',
  ol: 'O Livro',
  tb: 'Tradução Brasileira',
  vfa: 'Versão Fé Atual',
  aa: 'Almeida Atualizada',
  apee: 'Almeida Pastoral e Educativa',
  ra: 'Revista e Atualizada',
  
  // Versões em Inglês
  bbe: 'Bible in Basic English',
  kjv: 'King James Version',
  web: 'World English Bible',
  ylt: 'Young\'s Literal Translation',
  
  // Versões em Espanhol
  rvr: 'Reina-Valera Revisada',
  
  // Outras versões
  rccv: 'Revised Chinese Christian Version',
};

// Função para formatar nome da versão de forma consistente
export const formatVersionName = (versionCode: string): string => {
  const code = versionCode.toLowerCase();
  const fullName = versionNameMap[code];
  
  if (fullName) {
    return `${versionCode.toUpperCase()} - ${fullName}`;
  } else {
    return versionCode.toUpperCase();
  }
};

// Função para obter apenas o nome completo sem a abreviação
export const getVersionFullName = (versionCode: string): string => {
  const code = versionCode.toLowerCase();
  return versionNameMap[code] || versionCode.toUpperCase();
}; 