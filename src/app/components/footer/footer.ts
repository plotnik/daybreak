import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="footer-nav">
      <button mat-icon-button color="primary" (click)="prev()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <button mat-icon-button color="primary" (click)="next()">
        <mat-icon>arrow_forward</mat-icon>
      </button>
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
    this.scrollToTop();
  }

  next() {
    this.stateService.navigateToNextPoem();
    this.scrollToTop();
  }

  private scrollToTop() {
    // Small delay to ensure content has updated
    setTimeout(() => {
      const poemElement = document.querySelector('.poem-text');
      
      if (poemElement) {
        poemElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } 
    }, 100);
  }
}