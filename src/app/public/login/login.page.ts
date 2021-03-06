import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup ;

  constructor(private authService: AuthenticationService , private formBuilder: FormBuilder) { 
    this.loginForm = formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }
}
