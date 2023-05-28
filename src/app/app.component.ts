/* eslint-disable @typescript-eslint/ban-types */
import {
  Component,
  ComponentRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { JsonParser, Skill } from './json-parser';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { SelectTimeComponent } from './select-time/select-time.component';
import { SelectMoneyComponent } from './select-money/select-money.component';
import { OnInit, OnDestroy } from '@angular/core';
import {
  NgcCookieConsentService,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'learn-something-new';
  learn: String = '';
  description: String = '';
  resources: String = '';
  show_button: Boolean = true;
  parser!: JsonParser;

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  vcr!: ViewContainerRef;
  ref!: ComponentRef<any>; //current component ref

  selected_categories = [] as string[];
  selected_times = [] as string[];
  selected_money = [] as string[];
  possible_skills = [] as Skill[];

  constructor(private cookieService: NgcCookieConsentService) {
    this.parser = new JsonParser();
  }

  /**
   * Cleanup
   */
  ngOnDestroy() {
    this.removeChild();

    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.statusChangeSubscription.unsubscribe();
  }

  /**
   * Removes and deletes the current component
   */
  removeChild() {
    const index = this.vcr.indexOf(this.ref.hostView);
    if (index != -1) this.vcr.remove(index);
    this.ref.destroy();
  }

  /**
   * Start the selection Process
   */
  onStartSelecting() {
    //this.removeChild();
    this.show_button = false;
    this.learn = '';

    this.ref = this.vcr.createComponent(SelectCategoryComponent);
    this.ref.instance.categories = this.parser.categories;
    if (
      this.ref &&
      this.ref.instance &&
      this.ref.instance.onCategoriesSelected
    ) {
      this.ref.instance.onCategoriesSelected.subscribe((selected: string[]) =>
        this.onCategoriesSelected(selected)
      );
    }
  }

  onCategoriesSelected(selected_categories: string[]) {
    //console.log('Now Time Select');
    this.selected_categories = selected_categories;
    this.removeChild();
    //switch to time select
    this.ref = this.vcr.createComponent(SelectTimeComponent);
    this.ref.instance.times = this.parser.times;
    if (this.ref && this.ref.instance && this.ref.instance.onTimesSelected) {
      this.ref.instance.onTimesSelected.subscribe((selected: string[]) =>
        this.onTimesSelected(selected)
      );
    }
  }

  onTimesSelected(selected_times: string[]) {
    this.selected_times = selected_times;
    this.removeChild();
    //switch to time select
    this.ref = this.vcr.createComponent(SelectMoneyComponent);
    this.ref.instance.money = this.parser.money;
    if (this.ref && this.ref.instance && this.ref.instance.onMoneySelected) {
      this.ref.instance.onMoneySelected.subscribe((selected: string[]) =>
        this.onMoneySelected(selected)
      );
    }
  }

  onMoneySelected(selected_money: string[]) {
    this.selected_money = selected_money;
    this.removeChild();

    this.show_button = true;
    this.selectSkill();
  }

  /**
   * Selects skills based on what was chosen
   */
  selectSkill() {
    this.possible_skills = [];
    let possible: Boolean = false;

    for (const skill of this.parser.skills) {
      console.log(skill);
      possible = false;
      for (const c of skill.categories) {
        if (this.selected_categories.includes(c)) {
          possible = true;
          break;
        }
      }
      if (!possible) {
        continue;
      }
      possible = false;

      for (const c of skill.time) {
        if (this.selected_times.includes(c)) {
          possible = true;
          break;
        }
      }
      if (!possible) {
        continue;
      }
      possible = false;

      for (const c of skill.money) {
        if (this.selected_money.includes(c)) {
          possible = true;
          break;
        }
      }
      if (!possible) {
        continue;
      }

      this.possible_skills.push(skill);
    }

    if (this.possible_skills.length > 0) {
      const r = Math.floor(Math.random() * this.possible_skills.length);
      this.learn = this.possible_skills[r].skill;
      this.description = this.possible_skills[r].description;
      this.resources = this.possible_skills[r].resources;
      this.possible_skills.splice(r, 1);
    } else {
      this.learn = 'Make better choices...';
    }
  }

  newChoice() {
    if (this.possible_skills.length > 0) {
      const r = Math.floor(Math.random() * this.possible_skills.length);
      this.learn = this.possible_skills[r].skill;
      this.description = this.possible_skills[r].description;
      this.resources = this.possible_skills[r].resources;
      this.possible_skills.splice(r, 1);
    } else {
      this.learn = 'When to let go...';
    }
  }

  /**For Cookie consent*/
  //keep refs to subscriptions to be able to unsubscribe later
  private statusChangeSubscription!: Subscription;

  ngOnInit() {
    this.statusChangeSubscription = this.cookieService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        if (this.cookieService.hasConsented()) {
          const node: HTMLScriptElement = document.getElementById(
            'gtagupdate'
          ) as HTMLScriptElement;
          node.async = true;
          node.text = `
          gtag('consent', 'update', {
            ad_storage: 'denied',
            analytics_storage: 'granted',
          });`;
        } else {
          const node: HTMLScriptElement = document.getElementById(
            'gtagupdate'
          ) as HTMLScriptElement;
          node.async = true;
          node.text = `
          gtag('consent', 'update', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
          });`;
        }

        // you can use this.cookieService.getConfig() to do stuff...
      }
    );
  }
}
