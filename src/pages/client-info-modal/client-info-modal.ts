import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, FabContainer } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
  data = this.navParams.get('info') || {};
  ref = 'clients/details/' + this.fauth.auth.currentUser.uid + '/' + this.navParams.get('clientKey') + '/' + this.navParams.get('sectionKey');

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private fauth: AngularFireAuth, private fdb: AngularFireDatabase, private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientInfoModalPage');
    console.log(this.navParams.get('info'));

    this.fields = this.fdb.list(this.ref + '/fields');    
    console.log(this.data);  
  }

  addField(event, fab: FabContainer) {
    fab.close();
    let prompt = this.alert.create({
      title: 'New Field',
      message: 'Enter a name for this new section',
      inputs: [
        {
          name: 'title',
          placeholder: 'Field Title'
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
            console.log(this.navParams.data);
            console.log('field added to ' + this.ref);
            let newField = {
              fieldTitle: data.title,
              order: 0,
              type: 'text',
              value: ''
            };
            this.fdb.database.ref(this.ref + '/fields').push(newField);
            this.fdb.database.ref(this.ref).on('value', (snapshot) => {
              this.data = snapshot.val();
              console.log(this.data);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  closeModal() { 
    this.viewCtrl.dismiss(this.data);
  }

  checkData() {
    console.log(this.data);
    // this.fdb.database.ref(this.ref).on('value', (data) => {
    //   console.log(data.val());
    // });
  }

}
