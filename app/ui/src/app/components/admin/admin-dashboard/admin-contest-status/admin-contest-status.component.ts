import { Component } from '@angular/core';
import { ContestService } from '../../../../services/contest/contest.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { Contest } from '../../../../models/contest/contest';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-contest-status',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-contest-status.component.html',
  styleUrl: './admin-contest-status.component.css',
})
export class AdminContestStatusComponent {
  contests: Contest[] = [];
  constructor(
    private contestService: ContestService,
    private toast: ToastService
  ) {}
  ngOnInit() {
    this.contestService.getContests().subscribe({
      next: (data) => {
        this.contests = data;
      },
      error: (err) => this.toast.showToast('Error', 'danger'),
    });
  }
  getProgressWidth(contest: Contest) {
    var c = contest.participants.length;
    c = c / contest.maxParticipants;
    c = c * 100;
    return c + '%';
  }
  calculateDaysAgo(date: string): string {
    const now = new Date();
    const pastDate = new Date(date);
    return (
      Math.floor((now.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24)) +
      ' days'
    );
  }
  toggleContestStatus(id: number): void {
    const contest = this.contests.find((contest) => contest.id === id);

    if (contest) {
      // Toggle the disabled field
      contest.disabled = !contest.disabled;

      // Update the server with the new disabled state
      this.contestService.toggleContestStatus(id).subscribe({
        next: (response) => {
          console.log('Contest status updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating contest status:', error);
          contest.disabled = !contest.disabled; // Revert the change if needed
          this.toast.showToast('Error');
        },
      });
    } else {
      console.log(`Contest with id ${id} not found.`);
    }
  }
}
