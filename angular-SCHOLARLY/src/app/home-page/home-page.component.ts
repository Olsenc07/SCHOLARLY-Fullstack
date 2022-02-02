import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  email: FormControl = new FormControl('', Validators.email);
  password: FormControl = new FormControl('', Validators.minLength(8));

  isLoading = false;
  private authStatusSub: Subscription;


  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(public authService: AuthService, private snackBar: MatSnackBar)
  { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
   }

   ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
    }
  clearPassword(): void {
    this.password.setValue('');
  }

  clearEmail(): void {
    this.email.setValue('');
  }
 failedLogin(): void {
    this.snackBar.open('Failed to login. Please Try again', 'Will do!!');
  }
  successfullLogin(): void {
    this.snackBar.open('Welcome to the community', 'Thanks!');
  }

  onSubmit(): void {
    // TODO: wire up to login request
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.authService.login(this.email.value, this.password.value);


    // Trigger this.failedLogin() when login fails.
    // Trigger this.successfullLogin() when login succeeds
  }
}
