import { Component } from '@angular/core';
import { UserDetailsService } from '../../../../services/user/user-details.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
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
