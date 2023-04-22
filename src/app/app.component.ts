import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ComputedComponent } from './components/computed/computed.component';
import { CountComponent } from './components/count/count.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';

@Component({
  standalone: true,
  imports: [CountComponent, FormComponent, ListComponent, ComputedComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
