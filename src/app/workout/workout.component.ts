import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contacts } from '../contacts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  listOfContacts: Contacts[] = [];

  constructor(private contactService: ContactsService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    this.listOfContacts = this.contactService.getContacts();
   }

   createForm: FormGroup;

   newContact: Contacts;

  ngOnInit(): void {
  }

  // onUpdate(contents: any, id: number, name: String, telephone: String, email: String){
  //   this.modalService.open(contents);
  //   this.createForm = this.fb.group({
  //     _id: id,
  //     name: name,
  //     tel: telephone,
  //     email: email,
  //   });
  // }

  onSubmit(){
    this.newContact = new Contacts();
    this.newContact._id = this.createForm.value._id;
    this.newContact.name = this.createForm.value.name;
    this.newContact.tel = this.createForm.value.tel;
    this.newContact.email = this.createForm.value.email;
    this.contactService.addContact(this.newContact);
    this.createForm.reset();

  }

  openModal(contents:any){
    this.modalService.open(contents,  { windowClass: 'my-class'});
  }

}
