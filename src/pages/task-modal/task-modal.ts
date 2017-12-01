import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

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

  @ViewChild('taskname') taskname;
  title = this.navParams.get('Title');
  date: Date = this.navParams.get('DueDate') || '';
  notes = this.navParams.get('Notes') || '';
  created = new Date(this.navParams.get('Created')) || null;
  createdDisplay = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alert: AlertController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskModalPage');

    this.createdDisplay = this.convertDate();
    
    
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
    let alert = this.alert.create({
      title: 'Confirm deletion',
      message: 'Are you sure you would like to delete this task?',
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
            console.log('Yes clicked');
            this.viewCtrl.dismiss('delete');
          }
        }
      ]
    });
    alert.present();
  }


  convertDate() {
    console.log('converting date');

    if(this.created != null) {
      let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let day = this.created.getDay();
      let date = this.created.getDate();
      let month =  this.created.getMonth();
      let year = this.created.getFullYear().toString();
      if(year == new Date().getFullYear().toString()) { year = ''}
      let datestring = days[day] + ', ' + months[month] + ' ' + date + ' ' + year;
      return datestring;
    } else {
      return '';
    }
  }

  keyup(field) {
    console.log(field);
    this.taskname.removeFocus();
  }

}
