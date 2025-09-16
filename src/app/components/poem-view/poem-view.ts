import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { StateService } from '../../services/state.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-poem-view',
  standalone: true,
  imports: [CommonModule, MarkdownModule, MatIconModule, MatButtonModule, MatButtonModule],
  templateUrl: './poem-view.html',
  styleUrls: ['./poem-view.css']
})
export class PoemView {
  private stateService = inject(StateService);
  poem$ = this.stateService.currentPoem$;

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