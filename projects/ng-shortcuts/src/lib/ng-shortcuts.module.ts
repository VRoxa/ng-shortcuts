import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ShortcutManager } from './managers/shortcut-manager.service';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (manager: ShortcutManager) => () => {
        console.info('Shortcut manager initialized', manager)
      },
      deps: [ShortcutManager],
      multi: true
    }
  ]
})
export class NgShortcutsModule { }
