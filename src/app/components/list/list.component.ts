import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { Hero } from 'src/app/interfaces/hero.interface';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  heroes: WritableSignal<Hero[]>;

  constructor(private readonly _heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroes = this._heroesService.getHeroes();
  }
}
