import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the AddFieldPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-field',
  templateUrl: 'add-field.html',
})
export class AddFieldPage {
  title = '';
  type = '';
  order:Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private fdb: AngularFireDatabase, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFieldPage');
    console.log(this.navParams.get('section'));
  }

  closeModal() { 
    this.viewCtrl.dismiss();
  }

  saveField() {
    if(this.title !== '' && this.type !== '' && this.order !== null) {
      let newField = {
        fieldTitle: this.title,
        order: +this.order,
        type: this.type,
        value: ''
      };
      //this.fdb.database.ref(this.navParams.get('section') + '/fields').push(newField);
      this.viewCtrl.dismiss(newField);
    } else {
      console.log('wrong');
      let toast = this.toast.create({
        message: 'Please fill out all fields',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

}
