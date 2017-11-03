import { Component } from '@angular/core';

import { ClientsPage } from '../clients/clients';
import { TasksPage } from '../tasks/tasks';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TasksPage;
  tab2Root = ClientsPage;

  constructor() {

  }
}
