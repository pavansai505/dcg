import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccessControlService } from '../../../services/auth/access-control.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isUserLoggedIn:boolean=false
  isInstructorLoggedIn:boolean=false
  isAdminLoggedIn:boolean=false
  profileDropDownShow:boolean=false
  constructor(private router:Router,private accessControl:AccessControlService){
    this.isUserLoggedIn=accessControl.isUser;
    this.isAdminLoggedIn=accessControl.isAdmin
    this.isInstructorLoggedIn=accessControl.isInstructor
  }

changePageToSearch(){
  this.router.navigate(['/courses/search'])
}


}
