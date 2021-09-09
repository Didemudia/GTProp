import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {
  authObs: Observable<AuthResponseData>;
  private stopStream = new Subject<boolean>();
  isLoading: boolean;
  isLogin: boolean;
  pword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.authObs = this.isLogin ? this.authService.login(email, password) : this.authService.signup(email, password);
        this.authObs.pipe(
         takeUntil(this.stopStream)
        ).subscribe(resData => {
          console.log(resData);
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, errRes => {
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          const message = this.emailVerification(code);
          this.showAlert(message);
        });
      });
  }

  emailVerification = (code: string): string => {
    let message = '';
    if (code === 'EMAIL_EXISTS') {
      message = 'This email already exists';
    } else if (code === 'EMAIL_NOT_FOUND') {
      message = 'Email address could not be found';
    } else if (code === 'INVALID_PASSWORD') {
      message = 'This password is incorrect';
    }else{
      message = 'Unable to sign in';
    }
    return message
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay'],
      })
      .then((alertEl) => alertEl.present());
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  showPword(): void {
    this.pword = !this.pword;
  }


  ngOnDestroy(){
   this.stopStream.next(true);
  }
}
