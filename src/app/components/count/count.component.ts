import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-count',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountComponent {
  count: WritableSignal<number> = signal(0);
  total: Signal<string> = computed(() => (this.count() >= 0 ? 'green' : 'red'));

  increaseBy(num: number): void {
    this.count.update((value: number) => (value += num));
  }
}
