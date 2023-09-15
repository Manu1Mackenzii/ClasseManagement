import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-identity-form',
  templateUrl: './user-identity-form.component.html',
  styleUrls: ['./user-identity-form.component.scss']
})
export class UserIdentityFormComponent {
  isLoading: boolean = true;

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.isLoading = true;
    const value = this.form.value;
    this.router.navigateByUrl('/profile');
  }
}
