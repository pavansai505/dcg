import { Component } from '@angular/core';
import { TopInfoComponent } from './top-info/top-info.component';
import { SecondNavComponent } from './second-nav/second-nav.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TopInfoComponent,SecondNavComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
