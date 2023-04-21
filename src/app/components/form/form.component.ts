import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _heroesService = inject(HeroesService);
  form: FormGroup;

  ngOnInit(): void {
    this.form = this._fb.group({
      age: [0, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
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
