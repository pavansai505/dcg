import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccessControlService } from '../../../services/auth/access-control.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  @Output() searchInputCall=new EventEmitter<string>();
  constructor(private router:Router,private accessControl:AccessControlService){
    this.isUserLoggedIn=accessControl.isUser;
  }
  searchCourse(value:string)
  {
    this.searchInputCall.emit(value)
  }

}
