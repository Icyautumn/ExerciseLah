import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Contacts } from '../contacts';

@Component({
  selector: 'app-createcontact',
  templateUrl: './createcontact.component.html',
  styleUrls: ['./createcontact.component.css']
})
export class CreatecontactComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private contactService: ContactsService) { }

  createForm: FormGroup;

  ngOnInit(): void {
    this.createForm = this.fb.group({
      _id: '',
      name: '',
      tel: '',
      email: '',
    });
  }

  newContact: Contacts;

  onSubmit(){
    this.newContact = new Contacts();
    this.newContact._id = this.createForm.value._id;
    this.newContact.name = this.createForm.value.name;
    this.newContact.tel = this.createForm.value.tel;
    this.newContact.email = this.createForm.value.email;

    // console.log("this is a test" +this.newContact.name);

    this.contactService.addContact(this.newContact);
    this.createForm.reset();
  }

}
