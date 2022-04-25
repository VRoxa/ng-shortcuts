import { Subscription } from "rxjs";
import { ShortcutListener } from "../shortcut-listener";
import { ShortcutManager } from "./shortcut-manager.service";

export type ListenerConstructor<TComponent, TEvent = any> =
  new (manager: ShortcutManager) => ShortcutListener<TComponent, TEvent>;

export class StaticShortcutManager {

  public static muted = false;
  public static excludedElements: unknown[] = [];
  public static instance: ShortcutManager;

  public static muteListeners = () => {
    StaticShortcutManager.muted = true;
  }
  
  public static unmuteListeners = () => {
    StaticShortcutManager.muted = false;
  }

  public static excludeElement = (element: unknown) => {
    StaticShortcutManager.excludedElements = [
      ...StaticShortcutManager.excludedElements,
      element
    ];
  }

  public static includeElement = (element: unknown) => {
    StaticShortcutManager.excludedElements = StaticShortcutManager
      .excludedElements
      .filter(e => e === element);
  }

  public static registerListener = <
    TComponent,
    TListener extends ListenerConstructor<TComponent>
  >(
    listener: TListener,
    component: TComponent
  ): Subscription => {
    const instance = new listener(StaticShortcutManager.instance);
    return instance.initialize(component);
  }
}
