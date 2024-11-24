import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  username = '';
  password = '';
  isLogin = false;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const authType = params['authType'];
      console.log({ authType });
      if (!authType) this.handleAuthSwitch('register');
      this.isLogin = authType === 'login';
    });
  }

  handleAuthSwitch(authType: string) {
    console.log({ authType });
    this.router.navigate([], {
      queryParams: { authType },
    });
  }

  validateFields() {
    return this.password && this.username; //tmp
  }

  onSubmit() {
    if (!this.validateFields()) {
      window.alert('Enter the credentials first');
      return;
    }
    const url = this.isLogin ? 'login' : 'register';
    this.httpClient
      .post(`/auth/${url}`, {
        username: this.username,
        password: this.password,
      })
      .subscribe();
  }
}
