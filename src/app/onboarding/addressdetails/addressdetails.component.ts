import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatterns } from 'src/app/common/validators/patterns';

@Component({
  selector: 'app-addressdetails',
  templateUrl: './addressdetails.component.html',
  styleUrls: ['./addressdetails.component.scss'],
})
export class AddressdetailsComponent implements OnInit {
  addressForm: FormGroup;

  @Output() addressDataSubmitEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private validatorPatterns: ValidatorPatterns,

  ) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      addressline1: ['', Validators.required],
      addressline2: ['',],
      landmark: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.compose([Validators.required,Validators.pattern(this.validatorPatterns.Pin)])]
    });
  }

  onAddressSubmit() {
    let addressData = this.addressForm.value;
    this.addressDataSubmitEvent.emit(addressData);
  }

}
