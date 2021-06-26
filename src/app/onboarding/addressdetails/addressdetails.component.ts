import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/common/models/address';
import { ValidatorPatterns } from 'src/app/common/validators/patterns';

@Component({
  selector: 'app-addressdetails',
  templateUrl: './addressdetails.component.html',
  styleUrls: ['./addressdetails.component.scss'],
})
export class AddressdetailsComponent implements OnInit {

  @Input() addressInData: Address;

  addressForm: FormGroup;
  isSubmitted = false;
  isSubmitDisabled = false;

  @Output() addressDataSubmitEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private validatorPatterns: ValidatorPatterns,

  ) { }

  ngOnChanges() {
    this.initForm();
    if (this.addressInData?.addressId) {
      this.patchForm(this.addressInData)
    }
  }

  ngOnInit() {
  }

  initForm() {
    this.addressForm = this.formBuilder.group({
      addressline1: ['', Validators.required],
      addressline2: ['',],
      landmark: ['',],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.compose([Validators.required, Validators.pattern(this.validatorPatterns.Pin)])]
    });
  }

  patchForm(value: Address) {
    this.addressForm = this.formBuilder.group({
      addressline1: value.addressline1,
      addressline2: value.addressline2,
      landmark: value.landmark,
      street: value.street,
      city: value.city,
      state: value.state,
      pin: value.pin
    });
  }

  onAddressSubmit() {
    this.isSubmitted = true;
    if (this.addressForm.valid) {
      this.isSubmitDisabled = true;
      let addressData = this.addressForm.value;
      if (this.addressInData?.addressId) {
        addressData.isUpdate = this.addressInData.addressId
      }
      this.addressDataSubmitEvent.emit(addressData);
      setTimeout(() => {
        this.isSubmitDisabled = false;
      }, 5000);
    } else {
      return false;
    }
  }

  get errorControl() {
    return this.addressForm.controls;
  }

}
