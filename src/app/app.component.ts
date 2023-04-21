import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  count: WritableSignal<number> = signal(0);
  total: Signal<string> = computed(() => (this.count() >= 0 ? 'green' : 'red'));

  increaseBy(num: number): void {
    this.count.update((value: number) => (value += num));
  }
}
