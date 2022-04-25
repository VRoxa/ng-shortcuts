import { ShortcutManager } from "projects/ng-shortcuts/src/lib/managers/shortcut-manager.service";
import { Shortcut, ShortcutListener } from "projects/ng-shortcuts/src/public-api";
import { AppComponent } from "../app.component";

enum AppEvent {
  Hello,
  Goodbye
}

export class AppListener extends ShortcutListener<AppComponent, AppEvent> {
  protected shortcuts: Shortcut<AppEvent>[] = [
    { keys: ['o'], event: AppEvent.Hello },
    { keys: ['shift', 'o'], event: AppEvent.Goodbye }
  ];

  constructor(manager: ShortcutManager) {
    super(manager);
  }

  protected handle(component: AppComponent, event: AppEvent): void {
    switch (event) {
      case AppEvent.Hello:
        component.sayHello();
        break;
    
      case AppEvent.Goodbye:
        component.sayGoodbye();
        break;
    }
  }
}
