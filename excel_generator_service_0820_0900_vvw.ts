// 代码生成时间: 2025-08-20 09:00:54
import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelGeneratorService {
  private workbook: ExcelJS.Workbook;

  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  /**
   * Adds a new worksheet to the workbook and returns it.
   * @param name The name of the worksheet.
   */
  public addWorksheet(name: string): ExcelJS.Worksheet {
    const worksheet = this.workbook.addWorksheet(name);
    return worksheet;
  }

  /**
   * Writes data to the worksheet at specified row and column.
   * @param worksheet The worksheet where data will be written.
   * @param data The data to be written.
   * @param row The row index where data will be written.
   * @param column The column index where data will be written.
   */
  public writeDataToWorksheet(worksheet: ExcelJS.Worksheet, data: any, row: number, column: number): void {
    try {
      worksheet.getCell(row, column).value = data;
    } catch (error) {
      console.error('Error writing data to worksheet:', error);
    }
  }

  /**
   * Saves the workbook as an Excel file and triggers a download.
   * @param filename The name of the file to be saved.
   */
  public saveAsExcel(filename: string): void {
    try {
      this.workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, filename);
      });
    } catch (error) {
      console.error('Error saving workbook:', error);
    }
  }

  /**
   * Sets the properties of the workbook.
   * @param author The author of the workbook.
   * @param title The title of the workbook.
   */
  public setWorkbookProperties(author: string, title: string): void {
    this.workbook.creator = author;
    this.workbook.title = title;
  }
}
