import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, switchMap, tap, take } from 'rxjs';
import { PoemState } from '../poem.model';
import { PoemService } from './poem.service';

const STATE_KEY = 'poemAppState';

@Injectable({ providedIn: 'root' })
export class StateService {
  private poemService = inject(PoemService);

  // Default state if nothing is in local storage
  private defaultState: PoemState = { filename: 'titanik', number: 1, date: this.getTodayDate() };

  // Observables for components to subscribe to
  public poemState$ = new BehaviorSubject<PoemState>(this.loadState());
  public currentPoem$ = this.poemState$.pipe(
    switchMap(state => this.poemService.getPoem(state.filename, state.number))
  );

  constructor() {
    this.initialize();
  }

  private initialize() {
    const state = this.poemState$.getValue();
    if (state.date !== this.getTodayDate()) {
      this.navigateToNextPoem();
    }
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private loadState(): PoemState {
    const storedState = localStorage.getItem(STATE_KEY);
    return storedState ? JSON.parse(storedState) : this.defaultState;
  }

  private saveState(state: PoemState) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    this.poemState$.next(state);
  }

  navigateToNextPoem() {
    this.poemService.getPoemCount(this.poemState$.getValue().filename).pipe(take(1)).subscribe(count => {
      const currentState = this.poemState$.getValue();
      let nextNumber = currentState.number + 1;
      if (nextNumber > count) {
        nextNumber = 1; // Loop back to the first poem
      }
      this.saveState({ ...currentState, number: nextNumber, date: this.getTodayDate() });
    });
  }

  navigateToPrevPoem() {
    this.poemService.getPoemCount(this.poemState$.getValue().filename).pipe(take(1)).subscribe(count => {
      const currentState = this.poemState$.getValue();
      let prevNumber = currentState.number - 1;
      if (prevNumber < 1) {
        prevNumber = count; // Loop back to the last poem
      }
      this.saveState({ ...currentState, number: prevNumber, date: this.getTodayDate() });
    });
  }

  navigateToRandomPoem() {
    this.poemService.getPoemCount(this.poemState$.getValue().filename).pipe(take(1)).subscribe(count => {
        const currentState = this.poemState$.getValue();
        const randomNumber = Math.floor(Math.random() * count) + 1;
        this.saveState({ ...currentState, number: randomNumber, date: this.getTodayDate() });
    });
  }

  changeBook(newFilename: string) {
    this.saveState({ filename: newFilename, number: 1, date: this.getTodayDate() });
  }
}