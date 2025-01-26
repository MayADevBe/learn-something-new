import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-time',
  imports: [CommonModule],
  templateUrl: './select-time.component.html',
  styleUrls: ['./select-time.component.css'],
})
export class SelectTimeComponent {
  selected_times = [] as string[];
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onTimesSelected = new EventEmitter<any>();
  @Input() times!: string[];

  select_times(event: SubmitEvent) {
    //console.log('Times selected');
    event.preventDefault();

    for (const t of this.times) {
      const elem = <HTMLInputElement>document.getElementById(t)!;
      if (elem.checked) {
        this.selected_times.push(elem.id);
      }
    }

    this.onTimesSelected.emit(this.selected_times);
  }
}
