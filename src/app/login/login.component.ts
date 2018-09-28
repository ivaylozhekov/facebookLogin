import { Component, OnInit } from '@angular/core';
declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // 9665a7d7df4ff04658dbcb05d18e4839
  public status = '';
  constructor() {
      // This function initializes the FB variable
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
        // This is where we do most of our code dealing with the FB variable like adding an observer to check when the user signs in
    };
  }

  ngOnInit() {
    // if (window.FB) {
    //   window.FB.XFBML.parse();
    // }
  }

  checkLoginState() {
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
      this.status = '';
    } else {
      FB.login(function(response){
        // Handle the response object, like in statusChangeCallback() in our demo
        // code.
        debugger;
      });
      // The person is not logged into your app or we are unable to tell.
      this.status = 'Please log ' +
        'into this app.';
    }
  }

  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

}
