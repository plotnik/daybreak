import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="footer-nav">
      <button mat-flat-button color="primary" (click)="prev()">Prev</button>
      <button mat-flat-button color="primary" (click)="next()">Next</button>
    </div>
  `,
  styles: `
    .footer-nav {
      display: flex;
      gap: 8px;
      padding: 8px;
      border-top: 1px solid #ccc;
      > button {
        flex: 1;
      }
    }
  `
})
export class Footer {
  private stateService = inject(StateService);

  prev() {
    this.stateService.navigateToPrevPoem();
  }

  next() {
    this.stateService.navigateToNextPoem();
  }
}