import { Component } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { TokenService } from '../../../services/token/token.service';
import { AccessControlService } from '../../../services/auth/access-control.service';
import { CourseNavbarComponent } from "../../courses/course-navbar/course-navbar.component";

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet, RouterLink, CourseNavbarComponent],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {
  currentPath:string | null=null
  constructor(private router:Router,private activatedRouter:ActivatedRoute,private token:TokenService,private access:AccessControlService){
    
  }
 
  signOut(){
    this.access.refreshAccessControl()
    this.token.removeToken("jwt")
  }
  ngOnInit(): void {
    // This will get the initial path when the component is loaded
    this.currentPath = this.router.url;

    // Subscribe to router events to get the path on navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {    
        this.currentPath = event.url;
      });
  }
  isRouteActive(path:string){
    return path==this.currentPath;
    
    
  }
}
