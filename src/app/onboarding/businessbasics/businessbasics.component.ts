import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessDetails } from 'src/app/common/models/business';
import { User } from 'src/app/common/models/user';
import { ValidatorPatterns } from 'src/app/common/validators/patterns';

@Component({
  selector: 'app-businessbasics',
  templateUrl: './businessbasics.component.html',
  styleUrls: ['./businessbasics.component.scss'],
})
export class BusinessbasicsComponent implements OnInit, OnChanges {

  @Input() businessInData: BusinessDetails[];

  user: User;
  businessForm: FormGroup;
  showBusinessExtra: boolean = true;

  officeTypeOptions = [
    'Proprietorship',
    'Partnership',
    'Private Limited',
    'Limited',
    'Freelancing'
  ];

  @Output() businessBasicSubmitEvent = new EventEmitter();
  isSubmitted: boolean = false;
  isSubmitDisabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private validatorPatterns: ValidatorPatterns) { }


  ngOnChanges() {
    this.initForm();
    if (this.businessInData && this.businessInData[0] && this.businessInData[0].businessCode != null) {
      this.patchForm(this.businessInData[0])
    }
  }

  ngOnInit() {
  }

  initForm() {
    this.businessForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      businessDescription: ['',],
      businessIncorporationDate: ['',],
      businessOfficePhone: ['',],
      gstNo: ['', Validators.pattern(this.validatorPatterns.GstNo)],
      panNo: ['', Validators.pattern(this.validatorPatterns.PanNo)],
      businessWebsite: ['',],
      businessEmployeeStrength: ['',],
      businessTurnover: ['',],
      businessOfficeSpace: ['',],
      businessOfficeType: ['', Validators.required],
    });
  }

  patchForm(value: BusinessDetails) {
    this.businessForm.patchValue({
      businessName: value.businessName,
      businessDescription: value.businessDescription,
      businessIncorporationDate: value.businessIncorporationDate ? new Date(value.businessIncorporationDate) : "",
      businessOfficePhone: value.businessOfficePhone,
      gstNo: value.gstNo,
      panNo: value.panNo,
      businessWebsite: value.businessWebsite,
      businessEmployeeStrength: value.businessEmployeeStrength,
      businessTurnover: value.businessTurnover,
      businessOfficeSpace: value.businessOfficeSpace,
      businessOfficeType: value.businessOfficeType,
    });
  }

  officeTypeChanged() {
    // this.showBusinessExtra = false;
    if (this.businessForm.get('businessOfficeType').value && ['Own', 'Rented'].includes(this.businessForm.get('businessOfficeType').value)) {
      this.showBusinessExtra = true;
    } else {
      this.businessForm.patchValue({
        businessIncorporationDate: '',
        gstNo: '',
        panNo: '',
        businessOfficeSpace: ''
      })
    }
  }

  onBusinessSubmit() {
    this.isSubmitted = true;
    if (this.businessForm.valid) {
      this.isSubmitDisabled = true;
      let updatedProfile = this.businessForm.value;
      if (this.businessInData && this.businessInData[0] && this.businessInData[0].businessCode != null) {
        updatedProfile.isUpdation = true;
      }
      this.businessBasicSubmitEvent.emit(updatedProfile);
      setTimeout(() => {
        this.isSubmitDisabled = false;
      }, 5000);
    } else {
      return false;
    }
  }

  get errorControl() {
    return this.businessForm.controls;
  }

}
