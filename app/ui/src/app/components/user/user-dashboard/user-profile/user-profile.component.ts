import { Component } from '@angular/core';
import { UserDetailsService } from '../../../../services/user/user-details.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user:any
  constructor(private userService:UserDetailsService){
    userService.getMyDetails().subscribe({
      next:(val)=>{
        this.user=val
        console.log(val);
        
      },
      error:(err)=>{},
      complete:()=>{}
    })
  }

  toggleSubscription(){
    this.userService.emailSubscriptionToggle().subscribe({
      next:(val)=>{console.log(val);
      },
      error:(err)=>{console.log(err);
      }
    })
  }
}
