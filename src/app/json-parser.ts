import * as skillsJson from '../assets/skills.json';
import * as categoriesJson from '../assets/categories.json';
import * as timeJson from '../assets/times.json';
import * as moneyJson from '../assets/money.json';

/**
 * PArse from custom JSON files
 */
export class JsonParser {
  data: any = skillsJson;
  categoryData: any = categoriesJson;
  timesData: any = timeJson;
  moneyData: any = moneyJson;

  skills: Skill[] = [];
  categories: Category[] = [];
  times: string[] = [];
  money: string[] = [];

  constructor() {
    this.parse_json();
  }

  parse_json() {
    for (var i = 1; i < this.data.length; i++) {
      let row = this.data[i];
      let item = new Skill(row);
      this.skills.push(item);
    }

    for (var i = 1; i < this.categoryData.length; i++) {
      let row = this.categoryData[i];
      this.categories.push(new Category(row));
    }

    for (var i = 1; i < this.timesData.length; i++) {
      let row = this.timesData[i];
      this.times.push(row);
    }

    for (var i = 1; i < this.moneyData.length; i++) {
      let row = this.moneyData[i];
      this.money.push(row);
    }
  }
}

const Idx = {
  SKILL: 0,
  CATEGORIES: 1,
  TIME: 2,
  MONEY: 3,
  DESCRIPTION: 4,
  RESOURCES: 5,
};

export class Skill {
  skill!: String;
  categories!: string[];
  time!: string[];
  money!: string[];
  description!: String;
  resources!: String;

  constructor(row: any) {
    this.skill = row[Idx.SKILL];
    this.categories = row[Idx.CATEGORIES];
    this.time = row[Idx.TIME];
    this.money = row[Idx.MONEY];
    this.description = row[Idx.DESCRIPTION];
    this.resources = row[Idx.RESOURCES];
  }
}

const IdxC = {
  CATEGORY: 0,
  SUB_CATEGORIES: 1,
};

export class Category {
  category!: String;
  sub_categories!: string[];

  constructor(row: any) {
    this.category = row[IdxC.CATEGORY];
    this.sub_categories = row[IdxC.SUB_CATEGORIES];
  }
}
