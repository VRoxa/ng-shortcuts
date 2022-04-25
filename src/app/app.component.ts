import { Component } from '@angular/core';
import { UseShortcuts } from 'projects/ng-shortcuts/src/lib/decorators/use-shortcut.decorator';
import { AppListener } from './listeners/app.listener';

@UseShortcuts<AppComponent, typeof AppListener>(AppListener)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public muted: boolean = false;
  
  public sayHello = () => {
    console.info('Hello 🙋‍♂️');
  }

  public sayGoodbye = () => {
    console.info('Goodbye 🙋‍♂️');
  }

  public toggleMute = () => {
    this.muted = !this.muted;
  }
}
