import {Component, inject, OnInit} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {NumberBlocComponent} from '../../shared/components/number-bloc/number-bloc.component';
import {TitleComponent} from '../../shared/components/title/title.component';
import {OlympicService} from '../../shared/services/olympic.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [AsyncPipe, CommonModule, NumberBlocComponent, TitleComponent],
})
export class DashboardComponent  {
 private olympicService = inject(OlympicService);

 olympicData$ = this.olympicService.getOlympics().pipe(
     tap(data => console.log(data))
 )
}
