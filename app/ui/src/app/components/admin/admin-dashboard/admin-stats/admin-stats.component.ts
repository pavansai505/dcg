import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import AppStats from '../../../../models/dashboard/AppStats';


@Component({
  selector: 'app-admin-stats',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-stats.component.html',
  styleUrl: './admin-stats.component.css'
})
export class AdminStatsComponent {
  appStats!:AppStats
  constructor(private dashboardService:DashboardService){}
  ngOnInit(){
    this.dashboardService.getApplicationStats().subscribe({
      next:(data)=>this.appStats=data,
      error:(err)=>console.log(err),
      complete:()=>console.log(this.appStats)
      
    })
    
  }
}
