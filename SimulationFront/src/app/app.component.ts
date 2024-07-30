import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from "./view/aside-menu/aside-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsideMenuComponent],
  template: `
  <div id="main-container">
    <app-aside-menu />
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['../assets/styles/global.scss'],
})
export class AppComponent {

}
