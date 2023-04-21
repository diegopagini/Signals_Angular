# SIGNALS

## components

### count.component.html

```html
<div>
  <span> Count: </span><strong [ngStyle]="{ color: total() }">{{ count() }}</strong>

  <div class="container">
    <button mat-raised-button color="primary" (click)="increaseBy(1)">+1</button>
    <button mat-raised-button color="warn" (click)="increaseBy(-1)">-1</button>
  </div>
</div>
```

### count.component.ts

```typescript
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, Signal, signal, WritableSignal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-count",
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: "./count.component.html",
  styleUrls: ["./count.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountComponent {
  count: WritableSignal<number> = signal(0);
  total: Signal<string> = computed(() => (this.count() >= 0 ? "green" : "red"));

  increaseBy(num: number): void {
    this.count.update((value: number) => (value += num));
  }
}
```

### form.component.html

```html
<form class="form" [formGroup]="form" (ngSubmit)="onSubmit()">
  <h2>Add Hero</h2>

  <mat-form-field>
    <mat-label>Name</mat-label>
    <input formControlName="name" matInput placeholder="Name" type="text" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Age</mat-label>
    <input formControlName="age" matInput min="1" placeholder="Age" type="number" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Power</mat-label>
    <input formControlName="power" matInput max="100" min="1" placeholder="Power" type="number" />
  </mat-form-field>

  <button mat-raised-button color="primary" type="submit">SUBMIT</button>
</form>
```

### form.component.ts

```typescript
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HeroesService } from "src/app/services/heroes.service";

@Component({
  selector: "app-form",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _heroesService = inject(HeroesService);
  form: FormGroup;

  ngOnInit(): void {
    this.form = this._fb.group({
      age: [0, [Validators.required, Validators.min(1)]],
      name: ["", [Validators.required, Validators.minLength(3)]],
      power: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this._heroesService.addHero(this.form.value);
      this.form.reset();
    }
  }
}
```

### list.component.html

```html
<ul class="list">
  <li class="list__item" *ngFor="let hero of heroes(); let odd = odd; let even = even" [ngClass]="{ 'list__item--odd': odd, 'list__item--even': even }">
    <strong>Name: {{ hero.name }}</strong>
    <span>Age: {{ hero.age }}</span>
    <span>Power: {{ hero.power }}</span>
  </li>
</ul>
```

### list.component.ts

```typescript
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal } from "@angular/core";
import { Hero } from "src/app/interfaces/hero.interface";
import { HeroesService } from "src/app/services/heroes.service";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  heroes: WritableSignal<Hero[]>;

  constructor(private readonly _heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroes = this._heroesService.getHeroes();
  }
}
```

## services

### heroes.service.ts

```typescript
import { effect, Injectable, signal, WritableSignal } from "@angular/core";

import { Hero } from "../interfaces/hero.interface";

@Injectable({
  providedIn: "root",
})
export class HeroesService {
  private hero = signal<Hero>({
    age: 0,
    name: "",
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
```
