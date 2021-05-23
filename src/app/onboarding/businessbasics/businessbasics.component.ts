import { formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { User } from 'src/app/common/models/user';
import { BusinessService } from 'src/app/common/services/http/business.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { ValidatorPatterns } from 'src/app/common/validators/patterns';

@Component({
  selector: 'app-businessbasics',
  templateUrl: './businessbasics.component.html',
  styleUrls: ['./businessbasics.component.scss'],
})
export class BusinessbasicsComponent implements OnInit {

  user: User;
  businessForm: FormGroup;
  showBusinessExtra: boolean = false;

  officeTypeOptions = [
    'Freelancer',
    'Own',
    'Rented'
  ];

  @Output() businessBasicSubmitEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private businessService: BusinessService,
    private storedUserService: StoredUserService,
    private validatorPatterns: ValidatorPatterns) { }

  ngOnInit() {
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

  officeTypeChanged() {
    this.showBusinessExtra = false;
    if (this.businessForm.get('businessOfficeType').value && ['Own', 'Rented'].includes(this.businessForm.get('businessOfficeType').value)) {
      this.showBusinessExtra = true;
    }
  }

  onBusinessSubmit() {
    let updatedProfile = this.businessForm.value;
    this.businessBasicSubmitEvent.emit(updatedProfile);
  }

}
