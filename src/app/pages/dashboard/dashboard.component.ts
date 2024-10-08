import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { OlympicService } from '../../shared/services/olympic.service';
import { NumberBlocComponent } from '../../shared/components/number-bloc/number-bloc.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { catchError, finalize, map, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { OlympicCountry } from '../../shared/models/Olympic';
import { LineChartModule, PieChartModule } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    AsyncPipe,
    CommonModule,
    NumberBlocComponent,
    TitleComponent,
    LoaderComponent,
    PieChartModule,
    LineChartModule,
  ],
})
export class DashboardComponent implements OnInit {
  private olympicService = inject(OlympicService);
  private router = inject(Router);
  errorMessage: string = '';
  view: [number, number] = [700, 400];
  countryIdMap = new Map<string, string>(); // name - id
  numberOfJos: string[] = [];
  isLoading = signal(true);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateViewSize();
  }

  // Fetching olympic data and preparing for pie chart
  olympicData$ = this.olympicService.getOlympics().pipe(
    catchError((error: HttpErrorResponse) => {
      this.isLoading.set(false);
      if (error.status === 404) {
        this.errorMessage = 'Data is unavailable';
      } else if (error.status === 500) {
        this.errorMessage = 'Server Error';
      } else {
        this.errorMessage = error.message;
      }
      return of([]);
    }),
    tap((data: OlympicCountry[]) => {
      const participations = data.flatMap(country => country.participations);
      this.numberOfJos = Array.from(new Set(participations.map(participation => participation.id)));
    }),
    map((data: OlympicCountry[]) => {
      return data.map(country => {
        const totalMedals = country.participations.reduce(
          (sum, participation) => sum + participation.medalsCount,
          0,
        );
        this.countryIdMap.set(country.country, country.id);

        return {
          name: country.country,
          value: totalMedals,
        };
      });
    }),
    finalize(() => this.isLoading.set(false)),
  );

  ngOnInit() {
    this.updateViewSize();
  }

  updateViewSize() {
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.5;
    this.view = [width, height];
  }

  onCountrySelect($event: { name: string; label: string; value: number }) {
    const countryId = this.countryIdMap.get($event.name);
    if (countryId) {
      this.router.navigate([`/details/${countryId}`]);
    } else {
      this.errorMessage = `ID du pays non trouvé pour', ${$event.name}`;
    }
  }
}
