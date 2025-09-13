// 代码生成时间: 2025-09-14 03:38:49
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-responsive-layout',
  templateUrl: './responsive-layout.component.html',
  styleUrls: ['./responsive-layout.component.css']
})
export class ResponsiveLayoutAppComponent {
  // Observable Media query to detect the screen size
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  // Function to toggle layout
  toggleLayout(): void {
    const layout: string | null = document.getElementById('layout')?.getAttribute('layout');
    if (layout === 'row') {
      document.getElementById('layout')?.setAttribute('layout', 'column');
    } else {
      document.getElementById('layout')?.setAttribute('layout', 'row');
    }
  }
}

/*
 * responsive-layout.component.html
 * This template defines the structure of the application with responsive layout design.
 */

<!-- responsive-layout.component.html -->
<div layout='row'>
  <div class="example-container" fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="20px">
    <div fxFlex="50%" *ngIf="isHandset$ | async as handheld">
      <p *ngIf="handheld">Handset (small screens)</p>
      <p *ngIf="!handheld">Tablet / Desktop (large screens)</p>
    </div>
  </div>
  <button (click)="toggleLayout()">Toggle Layout</button>
</div>

/*
 * responsive-layout.component.css
 * This file contains the styles for the responsive layout application.
 */

/* responsive-layout.component.css */
.example-container {
  display: flex;
  flex-direction: column;
}

/* Add some responsive styles */
@media (max-width: 599px) {
  /* Styles for mobile devices */
  .example-container {
    flex-direction: column;
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  /* Styles for tablet devices */
  .example-container {
    flex-direction: row;
  }
}

@media (min-width: 960px) {
  /* Styles for desktop devices */
  .example-container {
    flex-direction: row;
  }
}
