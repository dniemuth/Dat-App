import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ClientModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-modal',
  templateUrl: 'client-modal.html',
})
export class ClientModalPage {

  name = this.navParams.get('Name');
  address = this.navParams.get('Address') || '';
  notes = this.navParams.get('Notes') || '';
  date = this.navParams.get('Date') || '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskModalPage');
  }

  closeModal() {
    let obj = {
      'address': this.address,
      'name': this.name,
      'notes': this.notes,
      'date': this.date
    } 
    this.viewCtrl.dismiss(obj);
  }

}
