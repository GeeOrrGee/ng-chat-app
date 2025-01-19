import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
MatTabChangeEvent;
@Component({
  selector: 'app-auth',
  imports: [
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButton,
    FormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export class AuthComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {}

  username = signal('');
  password = signal('');
  selectedTabIndex = signal(0);
  isLogin = computed(() => {
    return this.selectedTabIndex() === 0;
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const authType = params['authType'];
      if (!authType) this.handleAuthSwitch('register');
      this.selectedTabIndex.set(authType === 'login' ? 0 : 1);
      console.log(this.isLogin());
    });
  }

  handleAuthSwitch(authType: string) {
    this.router.navigate([], {
      queryParams: { authType },
    });
  }

  validateFields() {
    return this.password() && this.username(); //tmp
  }

  onSubmit() {
    if (!this.validateFields()) {
      window.alert('Enter the credentials first');
      return;
    }
    const creds = {
      username: this.username(),
      password: this.password(),
    };

    (this.isLogin()
      ? this.authService.login(creds)
      : this.authService.register(creds)
    ).subscribe((response: any) => {
      if (response.success) {
        this.router.navigate(['/']);
      } else {
        window.alert('Invalid credentials');
      }
    });
  }
}
