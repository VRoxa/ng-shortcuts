import { DelegatedShortcutListener } from "../listeners/delegated-shortcut-listener";
import { ListenerConstructor } from "../managers/static-shortcut-manager.service";
import { ShortcutListener } from "../shortcut-listener";
import { Shortcut } from "../shortcut.model";
import { SubscriptionOptions, UseShortcuts } from "./use-shortcut.decorator";

export function UseDelegateShortcuts<TComponent, TEvent>(
  shortcuts: Shortcut<TEvent>[],
  handle: (component: TComponent, event: TEvent) => void,
  options: SubscriptionOptions = { unsubscribe: true }
) {

  const factory: ListenerConstructor<TComponent> = DelegatedShortcutListener.bind<
    (component: TComponent, event: TEvent) => void, 
    Shortcut<TEvent>[], 
    never,
    ShortcutListener<TComponent, TEvent>
  >(null, handle, shortcuts);
  return UseShortcuts<TComponent>(factory, options);
}