import { Subscription } from "rxjs";
import { ListenerConstructor, StaticShortcutManager } from "../managers/static-shortcut-manager.service";
import { ShortcutListener } from "../listeners/shortcut-listener";
import { isValidLifehookFn } from "../utils/utils";

export interface SubscriptionOptions {
  unsubscribe: boolean;
}

/**
 * Decorator that marks a component to listen to an event stream.
 * @param listener The listener concrete implementation that listens and handles events.
 * @param options The subscription options.
 * @returns The use shortcuts decorator.
 */
export function UseShortcuts<
  TComponent,
  // TListener extends ListenerConstructor<TComponent>
>(
  listener: ListenerConstructor<TComponent>,
  options: SubscriptionOptions = { unsubscribe: true }
) {
  // The prototype is the decorated  component instance
  return function({ prototype }: Function) {
    // Keep the original lifehook functions
    const { ngOnInit, ngOnDestroy } = prototype;

    let subscription: Subscription;

    // Override the init lifehook
    // to initialize the listener.
    prototype.ngOnInit = function() {
      subscription = StaticShortcutManager.registerListener(listener, this);
      if (isValidLifehookFn(ngOnInit)) {
        ngOnInit.apply(this);
      }
    };

    // Override the destroy lifehook
    // to unsubscribe from the listener, if needed.
    prototype.ngOnDestroy = function() {
      const subscribed = !!subscription;
      const shouldUnsubscribe = options.unsubscribe && subscribed;

      if (shouldUnsubscribe) {
        subscription.unsubscribe();
      }

      if (isValidLifehookFn(ngOnDestroy) && subscribed) {
        ngOnDestroy.apply(this);
      }
    }
  }
}
