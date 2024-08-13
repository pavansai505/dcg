import { Component } from '@angular/core';
import { UserDetailsService } from '../../../../services/user/user-details.service';

@Component({
  selector: 'app-instructor-profile',
  standalone: true,
  imports: [],
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css'
})
export class InstructorProfileComponent {
  user:any
  constructor(private userService:UserDetailsService){
    userService.getMyDetails().subscribe({
      next:(val)=>{
        this.user=val
      },
      error:(err)=>{},
      complete:()=>{}
    })
  }

}
