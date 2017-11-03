import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ClientInfoModalPage } from '../client-info-modal/client-info-modal';

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
  clientType = this.navParams.get('ClientType') || '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private modal: ModalController, private fdb: AngularFireDatabase, private fauth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskModalPage');
  }

  addSection() {
    console.log('adding new section');
  }

  closeModal() {
    let obj = {
      'address': this.address,
      'name': this.name,
      'clientType': this.clientType
    } 
    this.viewCtrl.dismiss(obj);
  }

  clientInfo(infoType) {
    //console.log(this);
    this.fdb.database.ref('clients/details/' + this.fauth.auth.currentUser.uid + '/' + this.navParams.get('$key') + '/dates').once('value').then(data => {
      console.log(data.val());
      let info = {info: data.val()}
      let clientInfoModal = this.modal.create(ClientInfoModalPage, info);
      clientInfoModal.present();

      clientInfoModal.onDidDismiss(data => {
        this.fdb.database.ref('clients/details/' + this.fauth.auth.currentUser.uid + '/' + this.navParams.get('$key') + '/dates').update(
          data
        );
      });
    });
  }

  deleteClient(client) {
    this.viewCtrl.dismiss(null);
  }

}
