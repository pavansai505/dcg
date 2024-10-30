import { Component } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { ContestService } from '../../../services/contest/contest.service';
import { Contest } from '../../../models/contest/contest';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contests',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule,RouterLink,DatePipe],
  templateUrl: './contests.component.html',
  styleUrl: './contests.component.css'
})
export class ContestsComponent {

  contests:Contest[]=[]
  constructor(private contestService:ContestService){}
  ngOnInit(){
    this.contestService.getContests().subscribe({
      next:(data)=>{this.contests=data;
      }
      
    })
  }
  getProgressWidth(contest:Contest){
    var c=contest.participants.length;
    c=c/contest.maxParticipants;
    c=c*100;
    return c+'%'
  }
  calculateDaysAgo(date: string): string {
    const now = new Date();
    const pastDate = new Date(date);
    return Math.floor((now.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24)) + ' days';
  }

// Example usage with a timestamp:

}
