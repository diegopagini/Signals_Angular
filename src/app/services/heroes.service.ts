import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private hero = signal<Hero>({
    age: 0,
    name: '',
    power: 0,
  });
  private heroes = signal<Hero[]>([]);

  constructor() {
    effect(() => {
      console.log(`hero: ${this.hero()}`);
      console.log(`heroes: ${this.heroes()}`);
    });
  }

  getHero(): WritableSignal<Hero> {
    return this.hero;
  }

  getHeroes(): WritableSignal<Hero[]> {
    return this.heroes;
  }

  setHero(hero: Hero): void {
    this.hero.update(() => hero);
  }

  addHero(hero: Hero): void {
    this.heroes.update((heroes) => [...heroes, hero]);
  }
}
