import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ClientsPage } from '../clients/clients';
import { HomePage } from '../home/home';
import { TasksPage } from '../tasks/tasks';
import { ConversationsPage } from '../conversations/conversations';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TasksPage;
  tab3Root = ConversationsPage;
  tab4Root = ClientsPage;

  constructor() {

  }
}
