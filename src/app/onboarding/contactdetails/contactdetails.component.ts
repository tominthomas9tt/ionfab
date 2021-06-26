import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessDetails } from 'src/app/common/models/business';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { ValidatorPatterns } from 'src/app/common/validators/patterns';

@Component({
  selector: 'app-contactdetails',
  templateUrl: './contactdetails.component.html',
  styleUrls: ['./contactdetails.component.scss'],
})
export class ContactdetailsComponent implements OnInit {

  @Input() businessInData: BusinessDetails[];

  user;
  addressForm: FormGroup;

  @Output() contactDetailSubmitEvent = new EventEmitter();
  isSubmitted: boolean = false;
  isSubmitDisabled: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private storedUserService: StoredUserService,
    private validatorPatterns: ValidatorPatterns,
  ) {

  }

  ngOnChanges() {
    this.initForm();
    this.getstoredUer();
    if (this.businessInData && this.businessInData[0] && this.businessInData[0].businessCode != null) {
      this.patchForm(this.businessInData[0])
    }
  }

  ngOnInit() {
  }

  getstoredUer() {
    this.storedUserService.getUser().then((user) => {
      this.user = user;
      this.addressForm.patchValue({
        userPrimaryEmail: this.businessInData[0].primaryEmail ?? this.user.userUsername
      })
    });
  }

  initForm() {
    this.addressForm = this.formBuilder.group({
      userPrimaryPhone: ['', Validators.compose([Validators.required, Validators.pattern(this.validatorPatterns.Phone)])],
      userAlternatePhone: ['', Validators.compose([Validators.required, Validators.pattern(this.validatorPatterns.Phone)])],
      userPrimaryEmail: ['', Validators.compose([Validators.required, Validators.email])],
      userAlternateEmail: ['', Validators.compose([Validators.required, Validators.email])],
      businessOfficePhone: ['', Validators.pattern(this.validatorPatterns.Phone)],
    });
  }

  patchForm(value: BusinessDetails) {
    this.addressForm = this.formBuilder.group({
      userPrimaryPhone: [value.primaryMobile, Validators.compose([Validators.required, Validators.pattern(this.validatorPatterns.Phone)])],
      userAlternatePhone: [value.userAlternatePhone, Validators.compose([Validators.required, Validators.pattern(this.validatorPatterns.Phone)])],
      userPrimaryEmail: [value.primaryEmail, Validators.compose([Validators.required, Validators.email])],
      userAlternateEmail: [value.userAlternateEmail, Validators.compose([Validators.required, Validators.email])],
      businessOfficePhone: [value.businessOfficePhone, Validators.compose([Validators.pattern(this.validatorPatterns.Phone)])],
    });
  }

  onContactSubmit() {
    this.isSubmitted = true;
    if (this.addressForm.valid) {
      this.isSubmitDisabled = true;
      let contactData = this.addressForm.value;
      this.contactDetailSubmitEvent.emit(contactData);
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
