/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-money',
  templateUrl: './select-money.component.html',
  styleUrls: ['./select-money.component.css'],
})
export class SelectMoneyComponent {
  selected_money = [] as string[];
  @Output() onMoneySelected = new EventEmitter<any>();
  @Input() money!: string[];

  checkValue(event: any) {
    const checkvalue = (<HTMLInputElement>event.target).checked;
    const mo = (<HTMLSpanElement>event.target.nextElementSibling).innerText;

    let m = this.money[0];
    let i = 1;
    while (mo !== m) {
      const elem = <HTMLInputElement>document.getElementById(m)!;
      elem.checked = checkvalue;
      m = this.money[i];
      i += 1;
    }
  }

  select_money(event: SubmitEvent) {
    event.preventDefault();
    for (const m of this.money) {
      const elem = <HTMLInputElement>document.getElementById(m)!;
      if (elem.checked) {
        this.selected_money.push(elem.id);
      }
    }
    this.onMoneySelected.emit(this.selected_money);
  }
}
