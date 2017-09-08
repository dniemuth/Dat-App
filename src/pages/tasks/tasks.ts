import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TaskModalPage } from '../task-modal/task-modal';

/**
 * Generated class for the TasksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {

  tasks: FirebaseListObservable<any>;
  addNew = false;
  taskTitle = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController, private fdb: AngularFireDatabase, private fauth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
    this.tasks = this.fdb.list('tasks/' + this.fauth.auth.currentUser.uid);
  }

  addNewTask() {
    this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid).once('value').then((snapshot) => {
      console.log(snapshot.val());
    });
    if(this.taskTitle) {
      this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid).push({
        Title: this.taskTitle,
        Completed: false
      });
      this.addNew = false;
      this.taskTitle = '';
    }
  }

  editTask(task) {
    console.log(task);
    let taskModal = this.modal.create(TaskModalPage, task);
    taskModal.present();

    taskModal.onDidDismiss(data => {
      this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid + '/' + task.$key).update({
        DueDate: data.date
      });
    });
  }

  toggleComplete(task) {
    console.log(task);
    this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid + '/' + task.$key).update({
      Completed: !task.Completed
    });
    //console.log(task.Completed);
  }



}
