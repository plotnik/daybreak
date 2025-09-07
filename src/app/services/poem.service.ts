import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Poem } from '../poem.model';

@Injectable({ providedIn: 'root' })
export class PoemService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/poems`;

  getPoemFiles(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  getPoemCount(filename: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${filename}`);
  }

  getPoem(filename: string, number: number): Observable<Poem> {
    return this.http.get<Poem>(`${this.apiUrl}/${filename}/${number}`);
  }
}