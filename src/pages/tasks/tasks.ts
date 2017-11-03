import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TaskModalPage } from '../task-modal/task-modal';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

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

  @ViewChild('task') task;
  tasks: FirebaseListObservable<any>;
  completedTasks: FirebaseListObservable<any>;
  addNew = false;
  taskTitle = '';
  showCompleted = false;
  isApp = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController, private fdb: AngularFireDatabase, private fauth: AngularFireAuth, private keyboard: Keyboard, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');

    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    }

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
    }).map(tasks => tasks.sort(this.orderByCompletedDate)) as FirebaseListObservable<any>;
  }

  createNewTask() {
    this.addNew = true;
    setTimeout(() => {
      console.log(this.task);
      this.task.setFocus();
      if(this.isApp) {
        this.keyboard.show();
      }
    }, 150);
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
        DueDate: '',
        Created: firebase.database.ServerValue.TIMESTAMP,
        Author: this.fauth.auth.currentUser.uid,
        Modified: firebase.database.ServerValue.TIMESTAMP,
        Editor: this.fauth.auth.currentUser.uid
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
      if(data == null) {
        this.deleteTask(task)
      } else {
        this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid + '/' + task.$key).update({
          DueDate: data.date,
          Title: data.title,
          Notes: data.notes,
          Modified: firebase.database.ServerValue.TIMESTAMP,
          Editor: this.fauth.auth.currentUser.uid
        });
      }
    });
  }

  deleteTask(task) {
    this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid + '/' + task.$key).remove();
  }

  toggleComplete(task) {
    console.log(task);
    this.fdb.database.ref('tasks/' + this.fauth.auth.currentUser.uid + '/' + task.$key).update({
      Completed: !task.Completed,
      CompletedDate: firebase.database.ServerValue.TIMESTAMP
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
    console.log(a.DueDate + '; ' + b.DueDate);
    if (a.DueDate < b.DueDate) {
      if(a.DueDate == '' || a.DueDate == null) {return 1}     
      else{return -1}
    }
      
    if (a.DueDate > b.DueDate) {
      if(b.DueDate == '' || a.DueDate == null) {return -1}
      else {return 1 }
    }
    return 0;
  }

  orderByCompletedDate(a, b) {

    let aDate = new Date(a.CompletedDate);
    let bDate = new Date(b.CompletedDate)
    console.log(aDate);
    if ( aDate < bDate)
      return 1;
    if (aDate > bDate)
      return -1;
    return 0;
  }

}
