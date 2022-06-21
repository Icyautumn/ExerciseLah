import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contacts } from '../contacts';

@Component({
  selector: 'app-deletecontact',
  templateUrl: './deletecontact.component.html',
  styleUrls: ['./deletecontact.component.css']
})
export class DeletecontactComponent implements OnInit {

  listOfContacts: Contacts[] = [];

  constructor(private contactService: ContactsService) {
    this.listOfContacts = this.contactService.getContacts();
   }

  ngOnInit(): void {
  }

  newContact: Contacts;

  onDelete(id){
    this.newContact = new Contacts();

    this.contactService.deleteContact(this.newContact, id);

  }

}
