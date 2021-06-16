import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMsg:any;
  showSpinner = false;
  constructor(private authService: AuthService,private fb: FormBuilder,private router: Router,
    private tokenService: TokenService) {}

  ngOnInit(): void {
    this.init();
  }
  init(){
  //   this.signupForm = new FormGroup({
  //     username: new FormControl(),
  //     email: new FormControl(),
  //     password: new FormControl()
  //  });
 this.signupForm = this.fb.group({
    username: ['',[Validators.required]],
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required]]
 })
  }
  singupUser() {
    this.showSpinner = true;
    console.log(this.signupForm.value);
    this.authService.registerUser(this.signupForm.value).subscribe(
      (data) => {
         this.tokenService.SetToken(data.token);
        console.log(data);
        this.signupForm.reset();
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 3000);
       
      },
      err => 
      {
        this.showSpinner = false;
        console.log(err);
        if(err.error.msg){
            this.errorMsg = err.error.msg[0].message;
        }
        if(err.error.message){
          this.errorMsg = err.error.message;
      }
      }
    );
  }
}
