import { Component } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,RouterOutlet,RouterLink],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {
  currentPath:string | null=null
  constructor(private router:Router,private activatedRouter:ActivatedRoute){
    
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
