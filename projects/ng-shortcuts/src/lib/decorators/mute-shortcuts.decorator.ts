import { StaticShortcutManager } from "../managers/static-shortcut-manager.service";
import { isValidLifehookFn } from "../utils/utils";

type Constructor<T> = new (...args: any[]) => T;

/**
 * Decorator that marks a component as muted.
 * When a muted component is rendered, every shortcut listener in the application
 * is muted. Shortcut listeners will be unmuted again when the decorated component is destroyed.
 * @param component The decorated  component instance.
 */
export function MuteShortcuts<TComponent>({ prototype }: Constructor<TComponent>) {
  const { ngOnInit } = prototype;
  const { ngOnDestroy } = prototype;

  // Override the init lifehook
  // to mute any listener.
  prototype.ngOnInit = function() {
    StaticShortcutManager.muteListeners();
    if (isValidLifehookFn(ngOnInit)) {
      ngOnInit.apply(this);
    }
  };

  // Override the destroy lifehook
  // to unmute any listener.
  prototype.ngOnDestroy = function() {
    StaticShortcutManager.unmuteListeners();
    if (isValidLifehookFn(ngOnDestroy)) {
      ngOnDestroy.apply(this);
    }
  };
}