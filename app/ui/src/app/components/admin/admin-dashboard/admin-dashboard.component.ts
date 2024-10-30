import { Component } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { AccessControlService } from '../../../services/auth/access-control.service';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,RouterOutlet,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router:Router,private activatedRouter:ActivatedRoute,private token:TokenService,private access:AccessControlService){
    
  }
  signOut(){
    this.access.refreshAccessControl()
    this.token.removeToken("jwt")
  }
 
  
  
  

}
