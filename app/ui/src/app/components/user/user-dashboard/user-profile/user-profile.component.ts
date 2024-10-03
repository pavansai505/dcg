import { Component } from '@angular/core';
import { UserDetailsService } from '../../../../services/user/user-details.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user/user';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user!:User
  constructor(private userService:UserDetailsService,private toast:ToastService){
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
      next:(val:User)=>{console.log(val);
        this.user.subscribeToEmail=true
        this.toast.showToast("Subscribed to mail.")
      },
      error:(err)=>{console.log(err);
      }
    })
  }
}
