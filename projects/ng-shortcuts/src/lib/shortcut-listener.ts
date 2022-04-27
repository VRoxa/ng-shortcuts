import { Observable, Subscription } from "rxjs";
import { ShortcutManager } from "./managers/shortcut-manager.service";
import { Shortcut } from "./shortcut.model";

/**
 * Represents the abstract representation of a shortcut listener,
 * bound to an specific component and a defined of events.
 * Any concrete implementation of this class will implement the
 * actual behavior of the events handling.
 */
export abstract class ShortcutListener<TComponent, TEvent> {

  protected abstract shortcuts: Shortcut<TEvent>[];

  public manager!: ShortcutManager;

  /**
   * Initializes the listener to start listening to the specified shortcuts.
   * A new observable is created, that can be used to dispose the listener,
   * and unsubscribe from the event stream.
   * @param component The component instance that can handle raised events.
   * @returns The event subscription.
   */
  public initialize = (component: TComponent): Subscription => {
    const observable = new Observable<TEvent>(observer => {
      const subscriptions = this.shortcuts.map(({ keys, event }) => {
        return this.manager.registerGlobal(...keys).subscribe(_ => {
          observer.next(event);
        });
      });

      return () => {
        subscriptions.forEach(subscription => {
          subscription.unsubscribe();
        });
      };
    });

    return observable.subscribe(event => {
      this.handle(component, event);
    })
  }

  /**
   * Delegate function executed when an event is raised.
   * @param component The component instance subscribed to the event stream.
   * @param event The emitted event.
   */
  protected abstract handle(component: TComponent, event: TEvent): void;
}
