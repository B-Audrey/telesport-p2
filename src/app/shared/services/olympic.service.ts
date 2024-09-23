import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private http = inject(HttpClient);
  private olympicUrl = './assets/mock/olympic.json';

  getOlympics() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl);
  }

  getOneOlympicCountry$(id: string) {
    return this.http
      .get<OlympicCountry[]>(this.olympicUrl)
      .pipe(map(data => data.find(country => country.id.toString() === id)));
  }
}
