import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, FabContainer } from 'ionic-angular';

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

  clientDetails: FirebaseListObservable<any>;
  name = this.navParams.get('Name');
  address = this.navParams.get('Address') || '';
  clientType = this.navParams.get('ClientType') || '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private modal: ModalController, private fdb: AngularFireDatabase, private fauth: AngularFireAuth, private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskModalPage');

     //list of client detail sections
     this.clientDetails = this.fdb.list('clients/details/' + this.fauth.auth.currentUser.uid + '/' + this.navParams.get('$key'), {
      query: {
        orderByChild: 'SecTitle',
      }
    });

  }

  addSection(event, fab: FabContainer) {
    fab.close();
    let prompt = this.alert.create({
      title: 'New Section',
      message: 'Enter a name for this new section',
      inputs: [
        {
          name: 'title',
          placeholder: 'Section Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('saved clicked');
            console.log(data);
            this.fdb.database.ref('clients/details/' + this.fauth.auth.currentUser.uid + '/' + this.navParams.get('$key')).push({
              secTitle: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  closeModal() {
    let obj = {
      'address': this.address,
      'name': this.name,
      'clientType': this.clientType
    } 
    this.viewCtrl.dismiss(obj);
  }

  clientInfo(sectionId) {
    //console.log(this);
    this.fdb.database.ref('clients/details/' + this.fauth.auth.currentUser.uid + '/' + this.navParams.get('$key') + '/' + sectionId).once('value').then(data => {
      console.log(data);
      let info = {info: data.val(), clientKey:this.navParams.get('$key'), sectionKey: sectionId}
      let clientInfoModal = this.modal.create(ClientInfoModalPage, info);
      clientInfoModal.present();

      clientInfoModal.onDidDismiss(data => {
        this.fdb.database.ref('clients/details/' + this.fauth.auth.currentUser.uid + '/' + this.navParams.get('$key') + '/' + sectionId).update(
          data
        );
      });
    });
  }

  deleteClient(client) {
    this.viewCtrl.dismiss(null);
  }

}
