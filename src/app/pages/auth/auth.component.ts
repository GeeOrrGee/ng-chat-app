import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-auth',
  imports: [MatInputModule, MatFormFieldModule, MatButton, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export class AuthComponent {
  username = '';
  password = '';

  onSubmit() {}
}
