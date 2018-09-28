import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // secret: 9665a7d7df4ff04658dbcb05d18e4839
  public status = '';
  constructor(private cd: ChangeDetectorRef) {
      (function(d, s, id) {
        let js;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));


    window.fbAsyncInit = () => {
        console.log('fbasyncinit');

        FB.init({
            appId            : '322481008555486',
            cookie           : true,
            xfbml            : true,
            version          : 'v3.1'
        });
        FB.AppEvents.logPageView();
    };
  }

  ngOnInit() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }

  checkLoginState() {
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      this.testAPI();
    } else {
      FB.login(this.fbLogin);
      this.changeStatus('Please log into this app.');
    }
  }

  fbLogin = (response) => {
    console.log(response);
  }

  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', (response) => {
      console.log('Successful login for: ' + response.name);
      this.changeStatus('Thanks for logging in, ' + response.name + '!');
    });
  }

  changeStatus(status) {
    this.status = status;
    this.cd.detectChanges();
  }

}
