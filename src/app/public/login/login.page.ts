import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm    : FormGroup ;
  loaderToShow : any;

  constructor( private authService: AuthenticationService , private formBuilder: FormBuilder,
               public toastController: ToastController , public loadingController: LoadingController
             ) 
  { 
    this.loginForm = formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    
    this.showLoader();
    this.authService.authenticate( this.loginForm.value ).subscribe((response) => {

      this.hideLoader();

      if ( response.status && response.code == 200) {
      
        this.authService.login( response.data.access_token );
        this.loginForm.reset()
        this.presentToast("Login Successful!");
      
      }else {

        this.presentToast(response.message);
        
      }
    
    }, err => {
      setTimeout( () => {
          this.presentToast("Something went wrong! Please check Internet Connectivity. Thanks!");
          this.hideLoader()
      }, 8000);
    });

  }

  get f() {
    return this.loginForm.controls;
  }

  /**
   * Show Toast
   */
  async presentToast(m) {
  
    const toast = await this.toastController.create({
      message: m,
      duration: 3000,
      showCloseButton: true,
      position: "bottom"
    });
    toast.present();
  
  }

  /**
   * Show Loader
   */
  showLoader() {

    this.loaderToShow = this.loadingController.create({
      
      message: 'Authenticating...',
      spinner: 'bubbles'

    }).then((res) => {
     
      res.present();
      res.onDidDismiss().then((dis) => {
      });

    });
    
  }

  /**
   * Hide Loader
   */
  hideLoader() {

    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  
  }


}
