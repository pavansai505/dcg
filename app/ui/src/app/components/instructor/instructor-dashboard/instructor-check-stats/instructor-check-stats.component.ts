import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { Course } from '../../../../models/course/course';

@Component({
  selector: 'app-instructor-check-stats',
  standalone: true,
  imports: [],
  templateUrl: './instructor-check-stats.component.html',
  styleUrl: './instructor-check-stats.component.css'
})
export class InstructorCheckStatsComponent {
  courses:Course[]=[];
  constructor(private courseService:CourseDataService) {
    
  }
  ngOnInit(): void {
    this.courseService.getCourseByLoggedInUserId().subscribe({
      next:(value)=>{this.renderChart(value)}
    })
  }

  renderChart(data:Course[]): void {
    console.log(data);
    
    const ctx = document.getElementById('userChart') as HTMLCanvasElement;
    const names=data.map((ele)=>ele.title)
    const userCount=data.map(ele=>ele.users.length)
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: '# of Users',
          data: userCount,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
