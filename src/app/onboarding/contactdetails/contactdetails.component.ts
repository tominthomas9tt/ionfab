import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatterns } from 'src/app/common/validators/patterns';

@Component({
  selector: 'app-contactdetails',
  templateUrl: './contactdetails.component.html',
  styleUrls: ['./contactdetails.component.scss'],
})
export class ContactdetailsComponent implements OnInit {
  addressForm: FormGroup;

  @Output() contactDetailSubmitEvent = new EventEmitter();


  constructor(private formBuilder: FormBuilder,
    private validatorPatterns: ValidatorPatterns,
    ) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      userPrimaryPhone: ['', Validators.compose([Validators.required,Validators.pattern(this.validatorPatterns.Phone)])],
      userAlternatePhone: ['',Validators.pattern(this.validatorPatterns.Phone)],
      // userPrimaryEmail: ['', Validators.compose([Validators.required,Validators.email])],
      userAlternateEmail: ['',Validators.email],
      businessOfficePhone: ['',],
    });
  }

  onContactSubmit() {
    let contactData = this.addressForm.value;
    this.contactDetailSubmitEvent.emit(contactData);
  }
}
