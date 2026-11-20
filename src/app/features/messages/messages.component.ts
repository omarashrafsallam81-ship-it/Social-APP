import { Component } from '@angular/core';
import { NavbarComponent } from '../../layouts/main-layout/components/navbar/navbar.component';

@Component({
  selector: 'app-messages',
  imports: [NavbarComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {}
