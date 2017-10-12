import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  account: {name: string, email: string, photo: string} = {
    name: 'Derek',
    email: 'test@test.com',
    photo: 'http://photo.com'
  }

  editmode = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fauth: AngularFireAuth, private fdb: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    let user = this.fauth.auth.currentUser;
    this.account.name = user.displayName;
    this.account.email = user.email;
    this.account.photo = user.photoURL;
  }

  toggleEditMode() {
    this.editmode = !this.editmode;
  }

  doSignUp() {
    let user = this.fauth.auth.currentUser;
    user.updateProfile({
      displayName: this.account.name,
      photoURL: this.account.photo
    }).then(() => {
      this.toggleEditMode();
      this.account.name = user.displayName;
      this.account.photo = user.photoURL;
    });
  }

  signOut() {
    this.fauth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
