import { Component, Input } from '@angular/core';
import { Skill } from '../json-parser';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';


@Component({
  selector: 'app-stats',
  imports: [DragScrollComponent, NgxChartsModule, CommonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
  @Input() skills!: Skill[];
  stats: Stat[] = [];
  total: number = 0;
  multi!: any[];
  multi2!: any[];
  colorScheme: any = {
    domain: [
      '#b16286',
      '#98971a',
      '#d79921',
      '#458588',
      '#689d6a',
      '#fe8019',
      '#fb4934',
    ],
  };
  yAxisLabel: string = 'Categories';
  time_xAxisLabel: string = 'Times';
  money_xAxisLabel: string = 'Money';
  legendTitle: string = '';
  legendPosition: LegendPosition = LegendPosition.Below;

  createStats() {
    let temp = [] as Stat[];
    for (const skill of this.skills) {
      this.total = this.total + 1;
      for (const cat of skill.categories) {
        let added = false;
        for (const s of temp) {
          if (s.category === cat) {
            s.complete_count = s.complete_count + 1;
            added = true;
            for (const t of skill.time) {
              if (s.time_stats.has(t)) {
                let old: number = s.time_stats.get(t) ?? 0;
                s.time_stats.set(t, old + 1);
              } else {
                s.time_stats.set(t, 1);
              }
            }
            for (const m of skill.money) {
              if (s.money_stats.has(m)) {
                let old: number = s.money_stats.get(m) ?? 0;
                s.money_stats.set(m, old + 1);
              } else {
                s.money_stats.set(m, 1);
              }
            }
          }
        }
        if (!added) {
          let new_stat = new Stat();
          new_stat.category = cat;
          new_stat.complete_count = 1;
          for (const t of skill.time) {
            new_stat.time_stats.set(t, 1);
          }
          for (const m of skill.money) {
            new_stat.money_stats.set(m, 1);
          }
          temp.push(new_stat);
        }
      }
    }
    this.stats = temp;
    this.createCharts();
  }

  createCharts() {
    let multi = [] as any[];
    let multi2 = [] as any[];
    for (const s of this.stats) {
      let cat = s.category;

      let elem = { name: cat, series: [] as any[] };
      for (const key of s.time_stats.keys()) {
        elem.series.push({ name: key, value: s.time_stats.get(key) ?? 0 });
      }
      multi.push(elem);

      let elem2 = { name: cat, series: [] as any[] };
      for (const k of s.money_stats.keys()) {
        elem2.series.push({ name: k, value: s.money_stats.get(k) ?? 0 });
      }
      multi2.push(elem2);
    }
    this.multi = multi;
    this.multi2 = multi2;
  }
}

class Stat {
  category!: string;
  complete_count: number = 0;
  money_stats: Map<string, number> = new Map<string, number>();
  time_stats: Map<string, number> = new Map<string, number>();
}
