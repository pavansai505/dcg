import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccessControlService } from '../../../services/auth/access-control.service';
import { CommonModule } from '@angular/common';
import { UserDetailsService } from '../../../services/user/user-details.service';
import { TokenService } from '../../../services/token/token.service';

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
  imageUrl:string | null=null
  constructor(private router:Router,private accessControl:AccessControlService,private user:UserDetailsService,private token:TokenService){
    this.isUserLoggedIn=accessControl.isUser;
    this.isAdminLoggedIn=accessControl.isAdmin
    this.isInstructorLoggedIn=accessControl.isInstructor
    this.imageUrl=this.token.getToken('imageUrl')
  }
// ngOnInit(){
//   if(this.isUserLoggedIn && !this.imageUrl){
//     this.user.getUserImage().subscribe({
//       next: (imageUrl) => {
//           // Handle the successful response here, for example:
//           console.log("User image URL:", imageUrl);
//           this.imageUrl = imageUrl; // Assign it to a variable to display in your template
//           localStorage.setItem('imageUrl',imageUrl)
//       },
//       error: (error) => {
//           // Handle any errors that occur
//           console.error("Error fetching user image:", error);
//       },
//       complete: () => {
//           // This block runs when the observable completes
//           console.log("User image fetch complete.");
//       }
//   });
  
//   }
// }
changePageToSearch(){
  this.router.navigate(['/courses/search'])
}


}
