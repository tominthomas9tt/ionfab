import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BusinessDetails } from 'src/app/common/models/business';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { User } from 'src/app/common/models/user';
import { BusinessService } from 'src/app/common/services/http/business.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';


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


  constructor(private formBuilder: FormBuilder,
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
        this.businessProfile = data.data[0];
      }
    })
  }



  businessForm = this.formBuilder.group({
    businessName: ['', Validators.required],
    businessDescription: ['',],
    businessIncorporationDate: ['',],
    businessOfficePhone: ['',],
    gstNo: ['',],
    panNo: ['',],
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

}
