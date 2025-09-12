// 代码生成时间: 2025-09-13 04:47:49
import { Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-responsive-layout',
  templateUrl: './responsive_layout_app.html',
  styleUrls: ['./responsive_layout_app.css']
})
export class ResponsiveLayoutAppComponent {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private _breakpointObserver: BreakpointObserver, private _mediaMatcher: MediaMatcher) {
    this.mobileQuery = _mediaMatcher.matchMedia(Breakpoints.HandsetPortrait);
    this._mobileQueryListener = () => {
      this.checkLayout();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // Checks the layout and sets the state based on the screen size
  checkLayout(): void {
    if (this.mobileQuery.matches) {
      // If on a mobile device, close the sidenav on click
      console.log('Mobile layout activated');
    } else {
      // If on a desktop, keep the sidenav open
      console.log('Desktop layout activated');
    }
  }
}

/*
 * responsive_layout_app.html
 * This is the HTML template for the responsive layout app.
 * It uses Angular Material components to create a responsive layout.
 */
<!-- responsive_layout_app.html -->

<div class="container">
  <mat-sidenav-container autosize>
    <mat-sidenav #sidenav mode="over" [opened]="!mobileQuery.matches">
      <!-- Sidenav content here -->
      <button mat-button (click)="sidenav.toggle()">Toggle Sidenav</button>
    </mat-sidenav>
    <mat-sidenav-content>
      <!-- Main content here -->
      <button mat-button (click)="sidenav.toggle()">Toggle Sidenav</button>
    </mat-sidenav-content>
  </mat-sidenav-container>
</div>

/*
 * responsive_layout_app.css
 * This is the CSS for the responsive layout app.
 * It includes styles for responsive design.
 */

/* responsive_layout_app.css */

.container {
  padding: 16px;
}

/* Styles for different screen sizes using Angular's BreakpointObserver */
@media (max-width: 599px) {
  /* Mobile styles here */
}

@media (min-width: 600px) and (max-width: 959px) {
  /* Tablet styles here */
}

@media (min-width: 960px) {
  /* Desktop styles here */
}
