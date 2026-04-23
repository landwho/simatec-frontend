import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private transloco = inject(TranslocoService);

  translate(key: string, params?: Record<string, unknown>): string {
    return this.transloco.translate(key, params);
  }

  selectTranslate(key: string, params?: Record<string, unknown>): Observable<string> {
    return this.transloco.selectTranslate(key, params);
  }

  selectTranslateObject(key: string): Observable<Record<string, string>> {
    return this.transloco.selectTranslateObject(key);
  }

  setLanguage(lang: 'es' | 'en'): void {
    this.transloco.setActiveLang(lang);
  }

  getActiveLang(): string {
    return this.transloco.getActiveLang();
  }

  get langChanges$(): Observable<string> {
    return this.transloco.langChanges$;
  }
}
