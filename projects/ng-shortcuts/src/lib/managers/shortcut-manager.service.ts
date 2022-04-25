import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { Observable, TeardownLogic } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShortcutManager {
  
  constructor(
    private manager: EventManager,
    @Inject(DOCUMENT) private document: Document
  ) {
    console.log('Constructing manager');
  }
  
  public registerGlobal = (...keys: string[]): Observable<Event> => {
    return this.register(void 0, ...keys);
  }

  public register = (element?: HTMLElement, ...keys: string[]) => {
    const registree = <HTMLElement>(element || this.document);
    const event = this.eventify(...keys);

    return new Observable<Event>(observer => {
      const handle = (event: Event) => {
        event.stopPropagation();
        event.preventDefault();
        observer.next(event);
      }

      const dispose = this.manager.addEventListener(
        <HTMLElement>registree,
        event,
        handle
      );

      return <TeardownLogic>dispose;
    });
  }

  // Keyboard events are composed as the 'event' (i.e 'keydown')
  // And all the keys separated by dots.
  private eventify = (...keys: string[]) => {
    return `keydown.${keys.join('.')}`;
  }
}
