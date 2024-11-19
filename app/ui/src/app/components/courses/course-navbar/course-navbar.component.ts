import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccessControlService } from '../../../services/auth/access-control.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-course-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './course-navbar.component.html',
  styleUrl: './course-navbar.component.css'
})
export class CourseNavbarComponent {
  isUserLoggedIn:boolean=false
  searchInput:string=""
  isInstructorLoggedIn:boolean=false
  isAdminLoggedIn:boolean=false
  imageUrl:string | null=null
  @Input() courseSearchPage:boolean=false
  @Output() searchInputCall=new EventEmitter<string>();
  constructor(private router:Router,private accessControl:AccessControlService,private token:TokenService){
    this.isUserLoggedIn=accessControl.isUser;
    this.isAdminLoggedIn=accessControl.isAdmin
    this.isInstructorLoggedIn=accessControl.isInstructor
    this.imageUrl=this.token.getToken('imageUrl')
  }
  searchCourse(value:string)
  {
    this.searchInputCall.emit(value)
  }
  changePageToSearch(){
    this.router.navigate(['/courses/search'])
  }
  signOut(){
    this.accessControl.refreshAccessControl()
    this.token.clearMainTokens()
  }

}
