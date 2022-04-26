import { ShortcutManager } from "../managers/shortcut-manager.service";
import { ShortcutListener } from "../shortcut-listener";
import { Shortcut } from "../shortcut.model";

export class DelegatedShortcutListener<TComponent, TEvent> extends ShortcutListener<TComponent, TEvent> {
  
  private _handle: (component: TComponent, event: TEvent) => void;
  protected shortcuts: Shortcut<TEvent>[];
  
  constructor(
    handle: (component: TComponent, event: TEvent) => void,
    shortcuts: Shortcut<TEvent>[],
    manager: ShortcutManager,
  ) {
    super(manager);
    this.shortcuts = shortcuts;
    this._handle = handle;
  }

  protected handle(component: TComponent, event: TEvent): void {
    this._handle(component, event);
  }
}