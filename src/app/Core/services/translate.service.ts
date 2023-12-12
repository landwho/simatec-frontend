import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private dataSubject:Subject<boolean> = new Subject<boolean>();
  data: any = {};

  constructor(private http: HttpClient) {}

  use(lang: string): Promise<{}> {
    return new Promise<{}>(resolve => {
      const langPath: string = `assets/i18n/${lang || 'es'}.json`;
      this.http.get(langPath).subscribe({
        next: (res:Object) => {
          this.data = res || {};
          this.dataSubject.next(true);
          resolve(this.data);
        },
        error: ():void => {
          this.data = {};
          resolve(this.data);
        },
      });
    });
  }

  changeLanguage(){
    return this.dataSubject.asObservable();
  }

  instant(key: string) {
    return this.data[key] || key;
  }
  instant_child(key: string,child: string) {
    return this.data[key][child] || key;
  }
}
