import { HttpClient } from '@angular/common/http';
import {TRANSLOCO_LOADER, Translation, TranslocoLoader, TRANSLOCO_CONFIG, translocoConfig, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {APP_INITIALIZER, Injectable, NgModule} from '@angular/core';
import { environment } from '../environments/environment';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`${environment.baseUrl}/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'es', 'vn'],
        defaultLang: 'vn',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production,
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   useFactory: (translocoService: TranslocoService): any => (): Observable<Translation> =>  {
    //     return translocoService.load('en').pipe();
    //   },
    //   deps: [TranslocoService]
    //
    // }
  ]
})
export class TranslocoRootModule {}
