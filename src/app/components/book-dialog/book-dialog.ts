import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PoemService } from '../../services/poem.service';

@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatListModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Select a Book</h2>
    <mat-dialog-content>
      @if(books$ | async; as books) {
        <mat-list>
          @for(book of books; track book) {
            <mat-list-item (click)="selectBook(book)">{{ book }}</mat-list-item>
          }
        </mat-list>
      }
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]>Cancel</button>
    </mat-dialog-actions>
  `
})
export class BookDialog {
  private poemService = inject(PoemService);
  public dialogRef = inject(MatDialogRef<BookDialog>);
  books$ = this.poemService.getPoemFiles();

  selectBook(filename: string) {
    this.dialogRef.close(filename);
  }
}

