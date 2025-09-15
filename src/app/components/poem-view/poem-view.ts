import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-poem-view',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  template: `
    @if (poem$ | async; as poem) {
      <div class="poem-text poem-font">
        <markdown [data]="poem.text"></markdown>
      </div>
    } @else {
      <p>Loading poem...</p>
    }
  `,
  styles: `
    .poem-text {
      white-space: pre-wrap; /* Respects newlines in the text */
      font-size: 1.5rem;
      line-height: 1.6;
      text-align: center;
    }
  `
})
export class PoemView {
  private stateService = inject(StateService);
  poem$ = this.stateService.currentPoem$;
}