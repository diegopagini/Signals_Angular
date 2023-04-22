import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-computed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './computed.component.html',
  styleUrls: ['./computed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComputedComponent implements OnInit {
  private readonly heroesService = inject(HeroesService);
  hero = this.heroesService.getHero();
  unleashedHero = computed(() => ({
    ...this.hero(),
    power: this.hero().power * 2,
  }));

  ngOnInit(): void {
    this.heroesService.setHero({
      age: 40,
      name: 'IronMan',
      power: 70,
    });
  }
}
