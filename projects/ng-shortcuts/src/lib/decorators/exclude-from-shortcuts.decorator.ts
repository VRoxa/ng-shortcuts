import { StaticShortcutManager } from "../managers/static-shortcut-manager.service";
import { isValidLifehookFn } from "../utils/utils";

export function ExcludeFromShortcuts() {
  return (descriptor: {} | any, name: PropertyKey) => {
    
    const { ngAfterViewInit, ngOnDestroy } = descriptor;

    descriptor.ngAfterViewInit = function() {
      const { nativeElement } = this[name];
      StaticShortcutManager.excludeElement(nativeElement);

      if (isValidLifehookFn(ngAfterViewInit)) {
        ngAfterViewInit.apply(this);
      }
    }

    descriptor.ngOnDestroy = function() {
      const { nativeElement } = this[name];
      StaticShortcutManager.includeElement(nativeElement);

      if (isValidLifehookFn(ngOnDestroy)) {
        ngOnDestroy.apply(this);
      }
    }
  }
}