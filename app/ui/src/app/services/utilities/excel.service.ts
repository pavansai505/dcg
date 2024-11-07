import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() {}

  // Directly creates an Excel file from the received data without any processing
  downloadExcel(data: any[], filename: string = 'export') {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
  
    // Generate buffer and create Blob for the Excel file
    XLSX.writeFile(workbook, filename+'.xlsx');
  }
}
