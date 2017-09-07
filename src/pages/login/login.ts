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

  constructor(public navCtrl: NavController, public navParams: NavParams, private fauth: AngularFireAuth, private fdb: AngularFireDatabase, private keyboard: Keyboard) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    console.log('in login function');
    this.keyboard.close();
    this.fauth.auth.signInWithEmailAndPassword(this.account.email, this.account.password).then(()=> {
      this.navCtrl.setRoot(TabsPage);
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
