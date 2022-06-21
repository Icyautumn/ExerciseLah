import { Injectable } from '@angular/core';
import { Contacts } from './contacts';
import { listOfContacts } from './mock-contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor() { }

  getContacts(): Contacts[] {
    return listOfContacts;
  }

  addContact(item: Contacts): void{
    listOfContacts.push(item);
  }

  updateContact(item: Contacts, itemid: number): void{
    const target = listOfContacts.find((item) =>item._id === itemid);
    Object.assign(target, item);
  }

  deleteContact(item: Contacts, itemid: number): void{
    const removeIndex = listOfContacts.findIndex(item => item._id === itemid);
    listOfContacts.splice(removeIndex, 1);
  }
}
