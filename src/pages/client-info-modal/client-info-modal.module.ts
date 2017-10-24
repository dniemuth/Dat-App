import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientInfoModalPage } from './client-info-modal';

@NgModule({
  declarations: [
    ClientInfoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientInfoModalPage),
  ],
})
export class ClientInfoModalPageModule {}
