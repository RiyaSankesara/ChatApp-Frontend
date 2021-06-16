import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: any;
  showSpinner = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenservice: TokenService
  ) {}

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  loginUser() {
    this.showSpinner = true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      (data) => {
        this.tokenservice.SetToken(data.token);
        console.log(data);
        this.loginForm.reset();
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 3000);
      },
      (err) => {
        this.showSpinner = false;
        console.log(err);
        if (err.error.msg) {
          this.errorMsg = err.error.msg[0].message;
        }
        if (err.error.message) {
          this.errorMsg = err.error.message;
        }
      }
    );
  }
}
