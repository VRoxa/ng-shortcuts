import { Component } from "@angular/core";
import { MuteShortcuts } from "projects/ng-shortcuts/src/public-api";

@MuteShortcuts
@Component({
  selector: 'app-muted',
  template: `<p>Shortcuts are now muted globally!</p>`
})
export class MutedComponent {

}