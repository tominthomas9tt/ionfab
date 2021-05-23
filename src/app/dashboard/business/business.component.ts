import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BusinessDetails } from 'src/app/common/models/business';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { User } from 'src/app/common/models/user';
import { BusinessService } from 'src/app/common/services/http/business.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { ValidatorPatterns } from 'src/app/common/validators/patterns';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {

  user: User;
  businessProfile: BusinessDetails;
  isEditing: boolean = false;
  editButton: string = "Edit";
  hasBusiness: boolean = false;
  isCreatingBusiness: boolean = false;
  showBusinessExtra:boolean=false;

  officeTypeOptions = [
    'Freelancer',
    'Own',
    'Rented'
  ];


  constructor(private formBuilder: FormBuilder,
    private validatorPatterns: ValidatorPatterns,
    private notificationService: NotificationService,
    private businessService: BusinessService,
    private storedUserService: StoredUserService) {

  }

  ngOnInit() {
    this.storedUserService.getUser().then(user => {
      this.user = user;
      this.getBusinessDetails(this.user.userId);
    })
  }

  getBusinessDetails(businessId) {
    this.businessService.getBusinessDetails(businessId).subscribe((data: Httpresponse) => {
      if (data.status) {
        if (data.data[0].businessCode != null) {
          this.hasBusiness = true;
          this.businessProfile = data.data[0];
        }
      } else {
        this.hasBusiness = false;
      }
    })
  }

officeTypeChanged() {
    this.showBusinessExtra = false;
    if (this.businessForm.get('businessOfficeType').value && ['Own', 'Rented'].includes(this.businessForm.get('businessOfficeType').value)) {
      this.showBusinessExtra = true;
    }
  }

  businessForm = this.formBuilder.group({
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
    businessOfficeType: ['',],
  });

  updateEditBusiness() {
    this.businessForm.patchValue({
      businessName: this.businessProfile.businessName,
      businessDescription: this.businessProfile.businessDescription,
      businessIncorporationDate: new Date(Date()).toISOString(),
      businessOfficePhone: this.businessProfile.businessOfficePhone,
      gstNo: this.businessProfile.gstNo,
      panNo: this.businessProfile.panNo,
      businessWebsite: this.businessProfile.businessWebsite,
      businessEmployeeStrength: this.businessProfile.businessEmployeeStrength,
      businessTurnover: this.businessProfile.businessTurnover,
      businessOfficeSpace: this.businessProfile.businessOfficeSpace,
      businessOfficeType: this.businessProfile.businessOfficeType
    });
  }

  toggleIsEditing() {
    this.editButton = "Edit";
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.updateEditBusiness();
      this.editButton = "Cancel";
    }
  }

  onBusinessSubmit() {
    let updatedProfile = this.businessForm.value;
    updatedProfile.businessIncorporationDate = formatDate(new Date(updatedProfile.businessIncorporationDate), "d-MM-YYYY", "en-US");
    this.businessService.updateBusiness(this.user.userId, updatedProfile).subscribe((response: Httpresponse) => {
      if (response.status) {
        this.getBusinessDetails(this.user.userId);
        this.notificationService.showNotification("Business details updated.");
        this.toggleIsEditing();
      } else {
        console.log(response.error);
      }
    })
    console.warn(updatedProfile);
  }

  businessCreateForm = this.formBuilder.group({
    businessName: ['', Validators.required],
  });

  toggleIsCreating() {
    this.isCreatingBusiness = !this.isCreatingBusiness;
  }

  onBusinessCreateSubmit() {
    let updatedProfile = this.businessCreateForm.value;
    updatedProfile.userId = this.user.userId;
    this.businessService.createBusiness(updatedProfile).subscribe((response: Httpresponse) => {
      if (response.status) {
        this.toggleIsCreating();
        this.getBusinessDetails(this.user.userId);
        this.notificationService.showNotification("Business created updated.");
        this.toggleIsEditing();
      } else {
        console.log(response.error);
      }
    })
    console.warn(updatedProfile);
  }

}
