import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contacts } from '../contacts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.component.html',
  styleUrls: ['./updatecontact.component.css']
})
export class UpdatecontactComponent implements OnInit {

  listOfContacts: Contacts[] = [];


  constructor(private contactService: ContactsService, private modalService: NgbModal, private fb: FormBuilder) {
    this.listOfContacts = this.contactService.getContacts();
   }

  createForm: FormGroup;

  ngOnInit(): void {

  }
  newContact: Contacts;

  onUpdate(content: any, id: number, name: String, telephone: String, email: String){
    this.modalService.open(content);
    this.createForm = this.fb.group({
      _id: id,
      name: name,
      tel: telephone,
      email: email,
    });
  }

  onSubmit(){
    this.newContact = new Contacts();
    this.newContact._id = this.createForm.value._id;
    this.newContact.name = this.createForm.value.name;
    this.newContact.tel = this.createForm.value.tel;
    this.newContact.email = this.createForm.value.email;
    this.contactService.updateContact(this.newContact, this.newContact._id);
    this.createForm.reset();

  }

}
