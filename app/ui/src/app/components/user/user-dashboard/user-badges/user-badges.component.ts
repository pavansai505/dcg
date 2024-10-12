import { Component } from '@angular/core';
import { BadgeService } from '../../../../services/badge/badge.service';
import { Badge } from '../../../../models/badge/badge';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user-badges',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './user-badges.component.html',
  styleUrl: './user-badges.component.css'
})
export class UserBadgesComponent {
  badges:Badge[]=[]
constructor(private badgeService:BadgeService){}
ngOnInit(){
  this.badgeService.getBadgesForAuthenticatedUser().subscribe({
    next: (badges) => {
      this.badges=badges
      console.log('Received badges:', badges);
      // Handle successful response here (e.g., update the UI with badge data)
    },
    error: (err) => {
      console.error('Error occurred while fetching badges:', err);
      // Handle errors here (e.g., show an error message to the user)
    },
    complete: () => {
      console.log('Badge fetching process completed.');
      // Handle any final tasks or clean-up actions here
    }
  });
  
}
}
