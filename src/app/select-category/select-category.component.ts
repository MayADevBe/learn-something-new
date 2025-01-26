/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../json-parser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-category',
  imports: [CommonModule],
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css'],
})
export class SelectCategoryComponent {
  selected_categories = [] as string[];
  @Output() onCategoriesSelected = new EventEmitter<any>();
  @Input() categories!: Category[];

  //change all subcategories if main category is changed
  checkValue(event: any) {
    const checkvalue = (<HTMLInputElement>event.target).checked;
    const cat = (<HTMLSpanElement>event.target.nextElementSibling).innerText;

    for (const c of this.categories) {
      if (cat === c.category) {
        for (const sub of c.sub_categories) {
          const elem = <HTMLInputElement>document.getElementById(sub)!;
          elem.checked = checkvalue;
        }
      }
    }
  }

  select_categories(event: SubmitEvent) {
    event.preventDefault();
    const form = document.getElementById('form') as HTMLFormElement;
    const form_data = new FormData(form);
    for (const [name, value] of form_data) {
      this.selected_categories.push(name);
    }
    //console.log('Categories selected.');
    this.onCategoriesSelected.emit(this.selected_categories);
  }
}
