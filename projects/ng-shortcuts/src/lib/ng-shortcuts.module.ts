import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ShortcutManager } from './managers/shortcut-manager.service';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (manager: ShortcutManager) => () => {
        // The shortcut manager instance has to be resolved
        // when application starts, to hold the instance reference
        // in the static singleton (StaticShortcutManager).
        console.debug('Shortcut manager initialized', manager)
      },
      deps: [ShortcutManager],
      multi: true
    }
  ]
})
export class NgShortcutsModule { }
