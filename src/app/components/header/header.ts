import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { StateService } from '../../services/state.service';
import { BookDialog } from '../book-dialog/book-dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private stateService = inject(StateService);
  private dialog = inject(MatDialog);
  poem$ = this.stateService.currentPoem$;

  openBookSelection() {
    const dialogRef = this.dialog.open(BookDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stateService.changeBook(result);
      }
    });
  }

  selectRandom() {
    this.stateService.navigateToRandomPoem();
  }
}