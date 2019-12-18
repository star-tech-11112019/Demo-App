import { Component } from '@angular/core';
import { Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  authCheck:boolean = false;
  navigate : any;

  constructor( 
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.authenticationState.subscribe(state => {
        this.authCheck = !!state;
        this.router.navigate( state ? ['members', 'product'] : ['login'] );
      });
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Dashboard",
        url   : "members/dashboard",
        icon  : "home"
      },
      {
        
        title : "Gallery",
        url   : "members/gallery",
        icon  : "images"
      },
      {
        
        title : "Products",
        url   : "members/product",
        icon  : "md-clipboard"
      },
      
      {
        
        title : "Logout",
        url   : "members/logout",
        icon  : "log-out"
      },
    ]
  }

}
