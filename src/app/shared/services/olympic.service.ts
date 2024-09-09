import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private http = inject(HttpClient);
  private olympicUrl = './assets/mock/olympic.json';


  getOlympics() {
    return this.http.get<OlympicCountry>(this.olympicUrl);
  }
}
