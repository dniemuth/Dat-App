import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TaskModalPage } from '../task-modal/task-modal';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

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
  completedTasks: FirebaseListObservable<any>;
  addNew = false;
  taskTitle = '';
  showCompleted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController, private fdb: AngularFireDatabase, private fauth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');

    //list of in progress tasks
    this.tasks = this.fdb.list('tasks/' + this.fauth.auth.currentUser.uid, {
      query: {
        orderByChild: 'Completed',
        equalTo: false
      }
    }).map(tasks => tasks.sort(this.orderByDueDate)) as FirebaseListObservable<any>;
    
    //list of completed tasks
    this.completedTasks = this.fdb.list('tasks/' + this.fauth.auth.currentUser.uid, {
      query: {
        orderByChild: 'Completed',
        equalTo: true
      }
    }).map(tasks => tasks.sort(this.orderByDueDate)) as FirebaseListObservable<any>;
  }

  addNewTask() {
    // this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid).once('value').then((snapshot) => {
    //   console.log(snapshot.val());
    // });
    if(this.taskTitle) {
      this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid).push({
        Title: this.taskTitle,
        Completed: false,
        Notes: '',
        DueDate: ''
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
        DueDate: data.date,
        Title: data.title,
        Notes: data.notes
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

  showCompletedTasks() {
    console.log('showing completed tasks');
    this.showCompleted = !this.showCompleted;
    
    // this.fdb.database.ref('/tasks/' + this.fauth.auth.currentUser.uid)
    // .orderByChild('Completed').equalTo(true).once('value').then((snapshot) => {
    //   this.completedTasks = snapshot.val();
    //   console.log(snapshot.val());
    // }); 
  }

  orderByDueDate(a, b) {
    if (a.DueDate < b.DueDate)
      return -1;
    if (a.DueDate > b.DueDate)
      return 1;
    return 0;
  }



}
