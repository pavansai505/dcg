import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { PaymentService } from '../../../../services/payment/payment.service';

import { PaymentDTO } from '../../../../models/payment/payment';
import { forkJoin, catchError, of } from 'rxjs';
import AppStats from '../../../../models/dashboard/AppStats';
import { CommonModule, CurrencyPipe } from '@angular/common';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-admin-stats',
  standalone: true,
  imports: [RouterLink,CommonModule,CurrencyPipe],
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.css' ] // Fixed typo: should be styleUrls
})
export class AdminStatsComponent implements OnInit {
  appStats!: AppStats | null;
  payments: PaymentDTO[] = [];

  constructor(
    private dashboardService: DashboardService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      appStats: this.dashboardService.getApplicationStats().pipe(
        catchError(err => {
          console.error('Error fetching application stats', err);
          return of(null); // Handle error and return null
        })
      ),
      payments: this.paymentService.getAllPayments().pipe(
        catchError(err => {
          console.error('Error fetching payments', err);
          return of([]); // Handle error and return an empty array
        })
      )
    }).subscribe({
      next: ({ appStats, payments }) => {
        this.appStats = appStats; // Will be null if there was an error
        this.payments = payments; // Will be an empty array if there was an error
      },
      complete: () => {
        console.log('Data loading complete', { appStats: this.appStats, payments: this.payments });
      }
    });
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.payments);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');
  
    // Generate buffer and create Blob for the Excel file
    XLSX.writeFile(workbook, 'payments.xlsx');
  }
  

}
