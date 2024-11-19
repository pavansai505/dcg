import { Component } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
import { AccessControlService } from '../../../services/auth/access-control.service';
import { CourseNavbarComponent } from "../../courses/course-navbar/course-navbar.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet, RouterLink, CourseNavbarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(private router:Router,private activatedRouter:ActivatedRoute,private token:TokenService,private access:AccessControlService){
    
  }
  signOut(){
    this.access.refreshAccessControl()
    this.token.clearMainTokens()
  }
  
}
