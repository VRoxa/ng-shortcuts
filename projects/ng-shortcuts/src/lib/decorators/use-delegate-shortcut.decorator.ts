import { DelegatedShortcutListener } from "../listeners/delegated-shortcut-listener";
import { ListenerConstructor } from "../managers/static-shortcut-manager.service";
import { ShortcutListener } from "../listeners/shortcut-listener";
import { SubscriptionOptions, UseShortcuts } from "./use-shortcut.decorator";
import { DelegateShortcut } from "../delegate-shortcut.model";

export function UseDelegateShortcuts<TComponent>(
  delegateShortcuts: DelegateShortcut<TComponent>[],
  options: SubscriptionOptions = { unsubscribe: true }
) {
  // Bind the DelegatedShortcutListener constructor function
  // witb predefined arguments.
  // Get the result, which is a parameterless DelegatedShortcutListener constructor
  // that can be passed to the UseShortcuts decorator.
  // The DelegatedShortcutListener instance will be created by the UseShorcuts decorator.
  const factory: ListenerConstructor<TComponent> = DelegatedShortcutListener.bind<
    DelegateShortcut<TComponent>[], // Predefined adgument type (A0)
    never, // List of arguments to be defined (A extends any[])
    ShortcutListener<TComponent, number> // Return type (R)
  >(
    null,
    delegateShortcuts
  );

  return UseShortcuts<TComponent>(factory, options);
}