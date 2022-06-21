import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contacts } from '../contacts';

@Component({
  selector: 'app-displaycontact',
  templateUrl: './displaycontact.component.html',
  styleUrls: ['./displaycontact.component.css']
})
export class DisplaycontactComponent implements OnInit {

  listOfContacts: Contacts[] = [];

  constructor(private contactService: ContactsService) {
    this.listOfContacts = this.contactService.getContacts();
   }

  ngOnInit(): void {
  }

}
