import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TaskModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-modal',
  templateUrl: 'task-modal.html',
})
export class TaskModalPage {

  title = this.navParams.get('Title');
  date: Date = this.navParams.get('DueDate') || '';
  notes = this.navParams.get('Notes') || '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskModalPage');
  }

  closeModal() {
    let obj = {
      'date': this.date,
      'title': this.title,
      'notes': this.notes
    } 
    this.viewCtrl.dismiss(obj);
  }

  deleteTask() {
    this.viewCtrl.dismiss(null);
  }

}
