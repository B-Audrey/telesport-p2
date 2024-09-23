import { Component, DestroyRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { NumberBlocComponent } from '../../shared/components/number-bloc/number-bloc.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { OlympicService } from '../../shared/services/olympic.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OlympicCountry } from '../../shared/models/Olympic';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { LineChartModule } from '@swimlane/ngx-charts';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NumberBlocComponent,
    TitleComponent,
    AsyncPipe,
    LoaderComponent,
    LineChartModule,
    RouterLink,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private olympicService = inject(OlympicService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  isLoading = signal(true);
  olympic: OlympicCountry | undefined = undefined;
  totalMedals: number = 0;
  totalAthletes: number = 0;
  errorMessage: string = '';
  lineChartData: any[] = [];
  view: [number, number] = [700, 400];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateViewSize();
  }

  updateViewSize() {
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.3;
    this.view = [width, height];
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    if (this.route.snapshot.params['id']) {
      this.olympicService
        .getOneOlympicCountry$(this.route.snapshot.params['id'])
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
              this.errorMessage = 'Data is unavailable';
            } else if (error.status === 500) {
              this.errorMessage = 'Server Error';
            } else {
              this.errorMessage = error.message;
            }
            this.isLoading.set(false);
            return EMPTY;
          }),
        )
        .subscribe({
          next: data => {
            if (data?.id) {
              this.olympic = data;
              this.totalMedals = data.participations.reduce(
                (acc, current) => acc + (current.medalsCount || 0),
                0,
              );
              this.totalAthletes = data.participations.reduce(
                (acc, current) => acc + (current.athleteCount || 0),
                0,
              );
              this.lineChartData = [
                {
                  name: this.olympic.country,
                  series: data.participations.map(participation => ({
                    name: participation.year.toString(),
                    value: participation.medalsCount,
                  })),
                },
              ];
            } else {
              this.errorMessage = 'Aucune donnée trouvée';
            }
          },
          complete: () => {
            this.isLoading.set(false);
          },
        });
      this.updateViewSize();
    }
  }
}
