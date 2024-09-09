import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-number-bloc',
  standalone: true,
  imports: [],
  templateUrl: './number-bloc.component.html',
  styleUrl: './number-bloc.component.scss',
})
export class NumberBlocComponent {
  @Input() number: string = '';
  @Input() text: string = '';
}
