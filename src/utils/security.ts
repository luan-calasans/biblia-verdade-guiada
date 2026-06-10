import DOMPurify from 'dompurify';

// Configuração do DOMPurify para sanitização HTML
const purifyConfig = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'strong',
    'em',
    'u',
    's',
    'ol',
    'ul',
    'li',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'div',
    'span',
  ],
  ALLOWED_ATTR: ['class', 'style', 'data-*'],
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false,
};

/**
 * Sanitiza HTML usando DOMPurify
 */
export const sanitizeHtml = (html: string): string => {
  if (!html || typeof html !== 'string') return '';
  return DOMPurify.sanitize(html, purifyConfig);
};

/**
 * Sanitiza texto removendo caracteres perigosos
 */
export const sanitizeText = (text: string): string => {
  if (!text || typeof text !== 'string') return '';

  return text
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data URLs
    .trim();
};

/**
 * Valida email com regex segura
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Valida senha com critérios de segurança
 */
export const validatePassword = (
  password: string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (!password || typeof password !== 'string') {
    return { isValid: false, errors: ['Senha é obrigatória'] };
  }

  if (password.length < 6) {
    errors.push('Senha deve ter pelo menos 6 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valida URL para prevenir ataques
 */
export const validateUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;

  try {
    const urlObj = new URL(url);

    // Apenas HTTP e HTTPS
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }

    // Não permite javascript: ou data:
    if (
      url.toLowerCase().includes('javascript:') ||
      url.toLowerCase().includes('data:')
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

/**
 * Escape SQL-like strings (para busca local)
 */
export const escapeSearchQuery = (query: string): string => {
  if (!query || typeof query !== 'string') return '';

  return query
    .replace(/[%_\\]/g, '\\$&') // Escape SQL wildcards
    .replace(/'/g, "''") // Escape single quotes
    .trim()
    .substring(0, 100); // Limita tamanho
};

/**
 * Valida e sanitiza entrada de texto geral
 */
export const sanitizeInput = (
  input: string,
  maxLength: number = 1000
): string => {
  if (!input || typeof input !== 'string') return '';

  return sanitizeText(input).substring(0, maxLength);
};

/**
 * Gera um token CSRF simples para formulários
 */
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  );
};

/**
 * Valida token CSRF
 */
export const validateCSRFToken = (
  token: string,
  expectedToken: string
): boolean => {
  if (
    !token ||
    !expectedToken ||
    typeof token !== 'string' ||
    typeof expectedToken !== 'string'
  ) {
    return false;
  }

  return token === expectedToken;
};

/**
 * Rate limiting simples baseado em localStorage
 */
export const checkRateLimit = (
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 900000
): boolean => {
  try {
    const now = Date.now();
    const storageKey = `rateLimit_${key}`;
    const stored = localStorage.getItem(storageKey);

    if (!stored) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          attempts: 1,
          resetTime: now + windowMs,
        })
      );
      return true;
    }

    const data = JSON.parse(stored);

    // Reset window expired
    if (now > data.resetTime) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          attempts: 1,
          resetTime: now + windowMs,
        })
      );
      return true;
    }

    // Check if limit exceeded
    if (data.attempts >= maxAttempts) {
      return false;
    }

    // Increment attempts
    data.attempts++;
    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
  } catch (error) {
    return true; // Fail open para não bloquear usuários legítimos
  }
};

/**
 * Limpa dados sensíveis do localStorage de forma segura
 */
export const secureLocalStorageClear = (keys: string[]): void => {
  keys.forEach((key) => {
    try {
      // Sobrescreve com dados aleatórios antes de remover
      const randomData = generateCSRFToken();
      localStorage.setItem(key, randomData);
      localStorage.removeItem(key);
    } catch (error) {}
  });
};

/**
 * Detecta tentativas de XSS básicas
 */
export const detectXSS = (input: string): boolean => {
  if (!input || typeof input !== 'string') return false;

  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<embed|<object|<applet/gi,
    /expression\s*\(/gi,
    /vbscript:/gi,
    /data:text\/html/gi,
  ];

  return xssPatterns.some((pattern) => pattern.test(input));
};

/**
 * Headers de segurança para requisições fetch
 */
export const getSecureHeaders = (): HeadersInit => {
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
  };
};

export default {
  sanitizeHtml,
  sanitizeText,
  validateEmail,
  validatePassword,
  validateUrl,
  escapeSearchQuery,
  sanitizeInput,
  generateCSRFToken,
  validateCSRFToken,
  checkRateLimit,
  secureLocalStorageClear,
  detectXSS,
  getSecureHeaders,
};
