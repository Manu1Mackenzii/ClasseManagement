import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  isLoading: boolean = false;
  loginForm: FormGroup;
  loginErrors: boolean = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    // Remove errors when typing
    this.loginForm.valueChanges.subscribe(res => {
      this.loginErrors = false;
    })
  }

  signIn() {

    this.isLoading = true;
    const values = this.loginForm.value;
    this.loginErrors = false;

    this.authService.login(values).subscribe({
      next: (res: any) => {
        console.log('res', res);
        if (res?.success) {
          this.notificationService.displayToast({
            content: "Vous êtes connecté"
          });
          this.authService.redirectToProfile();
        } else {
          this.loginErrors = true;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        this.loginErrors = true;
        this.isLoading = false;
      }
    });
  }
}
