import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { OlympicService } from '../../shared/services/olympic.service';
import { NumberBlocComponent } from '../../shared/components/number-bloc/number-bloc.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import {catchError, finalize, of} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [AsyncPipe, CommonModule, NumberBlocComponent, TitleComponent, LoaderComponent],
})
export class DashboardComponent {
  private olympicService = inject(OlympicService);
  errorMessage: string = '';
  isLoading = signal(true);

  olympicData$ = this.olympicService.getOlympics().pipe(
    catchError((error: HttpErrorResponse) => {
      this.isLoading.set(false);
      console.warn(error);
      this.errorMessage = error.message;
      return of(null);
    }),
      finalize( () => this.isLoading.set(false) ),
  );
}
