// 代码生成时间: 2025-08-28 05:52:06
 * Features:
 * - Retrieves and displays a list of running processes.
 * - Allows the user to terminate a selected process.
 * - Shows notifications for successful or failed operations.
 */
import { Component, OnInit } from '@angular/core';
import { ProcessService } from './process.service'; // Importing the ProcessService for process management

@Component({
  selector: 'app-process-manager',
  templateUrl: './process_manager.component.html',
  styleUrls: ['./process_manager.component.css']
})
export class ProcessManagerComponent implements OnInit {
  // A list to hold the current running processes
  processes: any[] = [];
  
  // Constructor to inject the ProcessService
  constructor(private processService: ProcessService) {}
  
  // Lifecycle hook to fetch processes on component initialization
  ngOnInit(): void {
    this.fetchProcesses();
  }
  
  /*
   * Fetches and displays the list of running processes.
   * It also handles any error that might occur during retrieval.
   */
  fetchProcesses(): void {
    this.processService.getProcesses().subscribe({
      next: (data) => {
        this.processes = data;
      },
      error: (err) => {
        // Handle error, e.g., by displaying a notification to the user
        console.error('Error fetching processes:', err);
      }
    });
  }
  
  /*
   * Terminates the selected process and updates the list of processes.
   * It handles error notifications if the termination fails.
   * @param processId - The ID of the process to be terminated.
   */
  terminateProcess(processId: number): void {
    this.processService.terminateProcess(processId).subscribe({
      next: () => {
        // Remove the terminated process from the list
        this.processes = this.processes.filter(process => process.id !== processId);
      },
      error: (err) => {
        // Handle error, e.g., by displaying a notification to the user
        console.error('Error terminating process:', err);
      }
    });
  }
}
