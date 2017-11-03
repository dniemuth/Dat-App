import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ClientInfoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-info-modal',
  templateUrl: 'client-info-modal.html',
})
export class ClientInfoModalPage {
  data = this.navParams.get('info') || {};
  keys = Object.keys(this.navParams.get('info'));

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientInfoModalPage');
    console.log(this.navParams.get('info'));
  }

  closeModal() { 
    this.viewCtrl.dismiss(this.data);
  }

}
