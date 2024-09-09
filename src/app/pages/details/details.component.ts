import { Component, inject, OnInit } from '@angular/core';
import { NumberBlocComponent } from '../../shared/components/number-bloc/number-bloc.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { OlympicService } from '../../shared/services/olympic.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OlympicCountry } from '../../shared/models/Olympic';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NumberBlocComponent, TitleComponent, AsyncPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private olympicService = inject(OlympicService);
  private route = inject(ActivatedRoute);
  olympic: OlympicCountry | undefined = undefined;
  totalMedals: number = 0;
  totalAthletes: number = 0;

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.olympicService.getOneOlympicCountry(this.route.snapshot.params['id']).subscribe(data => {
        if (data) {
          this.olympic = data;
          this.totalMedals = data.participations.reduce(
            (acc, current) => acc + (current.medalsCount || 0),
            0,
          );
          this.totalAthletes = data.participations.reduce(
            (acc, current) => acc + (current.athleteCount || 0),
            0,
          );
        }
      });
    }
  }
}
