import { ShortcutManager } from "../managers/shortcut-manager.service";
import { ShortcutListener } from "./shortcut-listener";
import { Shortcut } from "../shortcut.model";
import { DelegateShortcut } from "../delegate-shortcut.model";

export class DelegatedShortcutListener<TComponent> extends ShortcutListener<TComponent, number> {
  
  // private _handle: (component: TComponent, event: TEvent) => void;
  private delegateShorcuts: DelegateShortcut<TComponent>[];
  protected shortcuts: Shortcut<number>[];
  
  constructor(
    // handle: (component: TComponent, event: TEvent) => void,
    // shortcuts: Shortcut<TEvent>[]
    delegateShortcuts: DelegateShortcut<TComponent>[]
  ) {
    super();
    this.delegateShorcuts = delegateShortcuts;
    this.shortcuts = delegateShortcuts.map(({ keys }, index) => ({
      keys,
      event: index
    }));
  }

  protected handle(component: TComponent, event: number): void {
    // this._handle(component, event);
    const { handle } = this.delegateShorcuts[event];
    handle(component);
  }
}