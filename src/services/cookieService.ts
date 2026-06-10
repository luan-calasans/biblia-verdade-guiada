export interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  emailNotifications: boolean;
  autoSave: boolean;
  dataRetention: number;
}

class CookieService {
  private static instance: CookieService;
  private cookieSettings: CookieSettings;
  private appSettings: AppSettings;

  private constructor() {
    this.cookieSettings = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };

    this.appSettings = {
      theme: 'auto',
      notifications: true,
      emailNotifications: true,
      autoSave: true,
      dataRetention: 365,
    };

    this.loadSettings();
  }

  public static getInstance(): CookieService {
    if (!CookieService.instance) {
      CookieService.instance = new CookieService();
    }
    return CookieService.instance;
  }

  private loadSettings(): void {
    try {
      // Carregar configurações de cookies
      const savedCookieSettings = localStorage.getItem('cookie_settings');
      if (savedCookieSettings) {
        const parsed = JSON.parse(savedCookieSettings);
        this.cookieSettings = {
          essential: true, // Sempre true
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false,
          preferences: parsed.preferences || false,
        };
      }

      // Carregar configurações do app
      const savedAppSettings = localStorage.getItem('app_settings');
      if (savedAppSettings) {
        const parsed = JSON.parse(savedAppSettings);
        this.appSettings = {
          theme: parsed.theme || 'auto',
          notifications: parsed.notifications !== false,
          emailNotifications: parsed.emailNotifications !== false,
          autoSave: parsed.autoSave !== false,
          dataRetention: parsed.dataRetention || 365,
        };
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  }

  public getCookieSettings(): CookieSettings {
    return { ...this.cookieSettings };
  }

  public getAppSettings(): AppSettings {
    return { ...this.appSettings };
  }

  public updateCookieSettings(settings: Partial<CookieSettings>): void {
    this.cookieSettings = {
      ...this.cookieSettings,
      ...settings,
      essential: true, // Sempre true
    };

    this.saveCookieSettings();
    this.applyCookieSettings();
  }

  public updateAppSettings(settings: Partial<AppSettings>): void {
    this.appSettings = {
      ...this.appSettings,
      ...settings,
    };

    this.saveAppSettings();
    this.applyAppSettings();
  }

  private saveCookieSettings(): void {
    try {
      localStorage.setItem(
        'cookie_settings',
        JSON.stringify(this.cookieSettings)
      );
    } catch (error) {
      console.error('Erro ao salvar configurações de cookies:', error);
    }
  }

  private saveAppSettings(): void {
    try {
      localStorage.setItem('app_settings', JSON.stringify(this.appSettings));
    } catch (error) {
      console.error('Erro ao salvar configurações do app:', error);
    }
  }

  private applyCookieSettings(): void {
    // Aplicar configurações de analytics
    if (this.cookieSettings.analytics) {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }

    // Aplicar configurações de marketing
    if (this.cookieSettings.marketing) {
      this.enableMarketing();
    } else {
      this.disableMarketing();
    }

    // Aplicar configurações de preferências
    if (this.cookieSettings.preferences) {
      this.enablePreferences();
    } else {
      this.disablePreferences();
    }
  }

  private applyAppSettings(): void {
    // Aplicar tema
    if (this.appSettings.theme !== 'auto') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(this.appSettings.theme);
    }

    // Aplicar outras configurações conforme necessário
    if (this.appSettings.notifications) {
      this.requestNotificationPermission();
    }
  }

  private enableAnalytics(): void {
    // Implementar Google Analytics ou similar
    console.log('Analytics habilitado');

    // Exemplo: Google Analytics
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('consent', 'update', {
    //     analytics_storage: 'granted'
    //   });
    // }
  }

  private disableAnalytics(): void {
    // Desabilitar analytics
    console.log('Analytics desabilitado');

    // Exemplo: Google Analytics
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('consent', 'update', {
    //     analytics_storage: 'denied'
    //   });
    // }
  }

  private enableMarketing(): void {
    // Habilitar cookies de marketing
    console.log('Marketing habilitado');
  }

  private disableMarketing(): void {
    // Desabilitar marketing
    console.log('Marketing desabilitado');
  }

  private enablePreferences(): void {
    // Habilitar cookies de preferências
    console.log('Preferências habilitado');
  }

  private disablePreferences(): void {
    // Desabilitar preferências
    console.log('Preferências desabilitado');
  }

  private async requestNotificationPermission(): Promise<void> {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
      }
    }
  }

  public acceptAllCookies(): void {
    this.updateCookieSettings({
      analytics: true,
      marketing: true,
      preferences: true,
    });
  }

  public rejectAllCookies(): void {
    this.updateCookieSettings({
      analytics: false,
      marketing: false,
      preferences: false,
    });
  }

  public clearAllData(): void {
    try {
      // Limpar localStorage
      localStorage.clear();

      // Recarregar configurações padrão
      this.loadSettings();

      console.log('Todos os dados foram limpos');
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  }

  public isCookieAccepted(type: keyof CookieSettings): boolean {
    return this.cookieSettings[type];
  }

  public getSetting<T extends keyof AppSettings>(key: T): AppSettings[T] {
    return this.appSettings[key];
  }
}

export const cookieService = CookieService.getInstance();
