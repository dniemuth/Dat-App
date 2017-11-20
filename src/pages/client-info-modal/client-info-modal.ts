import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, FabContainer, ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AddFieldPage } from '../add-field/add-field'

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
  fields: FirebaseListObservable<any>;
  f:any;
  ordered:any;
  data:any = this.navParams.get('info') || {};
  ref = 'clients/details/' + this.fauth.auth.currentUser.uid + '/' + this.navParams.get('clientKey') + '/' + this.navParams.get('sectionKey');

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private fauth: AngularFireAuth, private fdb: AngularFireDatabase, private alert: AlertController, private modal: ModalController) {
    this.fdb.list(this.ref + '/fields', {
      query: {
        orderByChild: 'order'
      }
    })
    .subscribe(data => {
      this.ordered = data;
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientInfoModalPage');
    console.log(this.navParams.get('info'));

    this.fields = this.fdb.list(this.ref + '/fields', {
      query: {
        orderByChild: 'order'
      }
    });   
  }

  createField(event, fab: FabContainer) {
    fab.close();
    let fieldModal = this.modal.create(AddFieldPage, {section: this.ref});
    fieldModal.present();

    fieldModal.onDidDismiss(rdata => {
      if(rdata) {
        this.fdb.database.ref(this.ref + '/fields').push(rdata);
        this.fdb.database.ref(this.ref).on('value', (snapshot) => {
          this.data = snapshot.val();
          console.log(this.data);
        });
      }
    });
  }

  reorderFields(indexes) {
    let element = this.ordered[indexes.from];
    this.ordered.splice(indexes.from, 1);
    this.ordered.splice(indexes.to, 0, element);
    let updates = {};
    for(let i = 0; i < this.ordered.length; i++) {
      let ele = this.ordered[i];
      let temp = ele.order = i;
      updates[ele.$key] = ele;
      this.data.fields[ele.$key].order = i;
    }
    this.fdb.database.ref(this.ref + '/fields/').update(updates);
    
  }

  closeModal() { 
    this.viewCtrl.dismiss(this.data);
  }


  deleteSection(section) {
    let alert = this.alert.create({
      title: 'Confirm deletion',
      message: 'Are you sure you would like to delete this section?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.viewCtrl.dismiss('delete');
          }
        }
      ]
    });
    alert.present();
  }

  deleteField(field) {
    console.log(field);
    let alert = this.alert.create({
      title: 'Confirm deletion',
      message: 'Are you sure you would like to delete this section?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.fdb.database.ref(this.ref + '/fields/' + field).remove();
          }
        }
      ]
    });
    alert.present();
  }

}
