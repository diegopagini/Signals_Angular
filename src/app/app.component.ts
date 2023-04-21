import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CountComponent } from './components/count/count.component';

@Component({
  standalone: true,
  imports: [CountComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
