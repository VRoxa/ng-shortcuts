import { Component, ElementRef, ViewChild } from '@angular/core';
import { UseShortcuts } from 'projects/ng-shortcuts/src/lib/decorators/use-shortcut.decorator';
import { ExcludeFromShortcuts } from 'projects/ng-shortcuts/src/public-api';
import { AppListener } from './listeners/app.listener';

@UseShortcuts<AppComponent, typeof AppListener>(AppListener)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
    .content { display: flex; align-items: center;}
    .excluded-element { margin: 2rem 0; }
    .right { font-size: 5rem; padding: 0 1rem; }`
  ]
})
export class AppComponent {

  public muted: boolean = false;
  public counter: number = 0;

  @ExcludeFromShortcuts()
  @ViewChild('excluded') excluded?: ElementRef<HTMLButtonElement>;
  
  public sayHello = () => {
    console.info('Hello 🙋‍♂️');
    ++this.counter;
  }

  public sayGoodbye = () => {
    console.info('Goodbye 🙋‍♂️');
    --this.counter;
  }

  public toggleMute = () => {
    this.muted = !this.muted;
  }
}
