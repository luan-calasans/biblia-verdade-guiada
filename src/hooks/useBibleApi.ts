import { normalizeVerse, normalizeVerses } from '@/utils/bibleNormalizer';

/**
 * Hook para fazer requisições à API bíblica com normalização automática dos dados
 */
export const useBibleApi = () => {
  /**
   * Faz uma requisição para a API e normaliza automaticamente os dados de resposta
   */
  const fetchWithNormalization = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Normalizar dados baseado na estrutura da resposta
    if (data.verses && Array.isArray(data.verses)) {
      // Resposta com array de versículos (como SearchResponse)
      return {
        ...data,
        verses: normalizeVerses(data.verses),
      };
    } else if (data.book && data.book.author) {
      // Resposta com um único versículo
      return normalizeVerse(data);
    }

    return data;
  };

  return {
    fetchWithNormalization,
  };
};
