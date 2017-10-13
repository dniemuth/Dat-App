import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { SignupPage } from '../../pages/signup/signup';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account: { name:string, email:string, password:string } = {
    name: 'Test Human',
    email: '',
    password: ''
  }
  loginError = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fauth: AngularFireAuth, private fdb: AngularFireDatabase, private keyboard: Keyboard) {
  }

  ionViewWillLoad() {
    console.log('view is about to load');
    this.fauth.auth.onAuthStateChanged((user) => {
      if(user) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        console.log('no user');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');   
  }

  doLogin() {
    console.log('in login function');
    this.keyboard.close();
    this.fauth.auth.signInWithEmailAndPassword(this.account.email, this.account.password).then(()=> {
      this.navCtrl.setRoot(TabsPage);
    }).catch(error => {
      this.loginError = true;
      console.log(error);
    });
  }

  createAccount() {
    console.log('in createAccount()');
    this.navCtrl.push(SignupPage);
  }

  toHome() {
    this.navCtrl.setRoot(TabsPage);
  }

}
