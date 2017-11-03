import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ClientModalPage } from '../client-modal/client-modal';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as firebase from 'firebase';

/**
 * Generated class for the ClientsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  @ViewChild('client') client;
  clients: FirebaseListObservable<any>;
  addNew = false;
  clientName = '';
  clientType = '';
  propertyAddress = '';
  isApp = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController, private fdb: AngularFireDatabase, private fauth: AngularFireAuth, private keyboard: Keyboard, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');

    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    }

    //list of clients
    this.clients = this.fdb.list('clients/common/' + this.fauth.auth.currentUser.uid, {
      query: {
        orderByChild: 'Name',
      }
    });
    
  }

  createNewClient() {
    this.addNew = true;
    setTimeout(() => {
      console.log(this.client);
      this.client.setFocus();
      if(this.isApp) {
        this.keyboard.show();
      }
    }, 150);
  }

  addNewClient() {
    // this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid).once('value').then((snapshot) => {
    //   console.log(snapshot.val());
    // });
    if(this.clientName) {
      this.fdb.database.ref('clients/common/' + this.fauth.auth.currentUser.uid).push({
        Name: this.clientName,
        Created: firebase.database.ServerValue.TIMESTAMP,
        Author: this.fauth.auth.currentUser.uid,
        Modified: firebase.database.ServerValue.TIMESTAMP,
        Editor: this.fauth.auth.currentUser.uid
      });
      this.addNew = false;
      this.clientName = '';
    }
  }

  editClient(client) {
    console.log(client);
    let clientModal = this.modal.create(ClientModalPage, client);
    clientModal.present();

    clientModal.onDidDismiss(data => {
      if(data == null) {
        this.deleteClient(client);
      } else {
        this.fdb.database.ref('clients/common/' + this.fauth.auth.currentUser.uid + '/' + client.$key).update({
          Address: data.address,
          Name: data.name,
          ClientType: data.clientType,
          Modified: firebase.database.ServerValue.TIMESTAMP,
          Editor: this.fauth.auth.currentUser.uid
        });
      }
    });
  }

  deleteClient(client) {
    this.fdb.database.ref('clients/common/'+this.fauth.auth.currentUser.uid + '/' + client.$key).remove();
  }

}
