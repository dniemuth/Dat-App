import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Keyboard } from '@ionic-native/keyboard';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TasksPage } from '../pages/tasks/tasks';
import { ConversationsPage } from '../pages/conversations/conversations';
import { TaskModalPage } from '../pages/task-modal/task-modal';
import { ClientsPage } from '../pages/clients/clients';
import { ClientModalPage } from '../pages/client-modal/client-modal';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyDu_v9sj0rs41gDzvWZeUCWz357uuozlQQ",
  authDomain: "cms-skin.firebaseapp.com",
  databaseURL: "https://cms-skin.firebaseio.com",
  projectId: "cms-skin",
  storageBucket: "cms-skin.appspot.com",
  messagingSenderId: "111138137302"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    TasksPage,
    ConversationsPage,
    TaskModalPage,
    ClientsPage,
    ClientModalPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    TasksPage,
    ConversationsPage,
    TaskModalPage,
    ClientsPage,
    ClientModalPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
