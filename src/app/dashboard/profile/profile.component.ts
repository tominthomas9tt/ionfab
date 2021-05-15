import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { User, UserDetails } from 'src/app/common/models/user';
import { UserService } from 'src/app/common/services/http/user.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { formatDate } from "@angular/common";
import { isEmpty } from 'src/app/common/utils/utils';

const USER_KEY = "user-data";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: User;
  userProfile: UserDetails;
  isEditing: boolean = false;
  editButton: string = "Edit";

  constructor(private fb: FormBuilder, private storageService: StorageService, private userService: UserService) {

  }

  ngOnInit() {
    this.storageService.getData(USER_KEY).then(user => {
      this.user = user;
      if (isEmpty(this.userProfile)) {
        this.getUserDetails(this.user.userId);
      }
    })

  }

  profileForm = this.fb.group({
    userName: ['', Validators.required],
    userDob: ['',],
    userGender: ['',],
    userPrimaryEmail: ['', Validators.email],
    userAlternateEmail: ['', Validators.email],
    userPrimaryPhone: ['',],
    userAlternatePhone: ['',],
  });

  addressForm = this.fb.group({
    addressline1: ['', Validators.required],
    addressline2: ['', Validators.required],
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  });

  getUserDetails(userId) {
    this.userService.getUserDetails(userId).subscribe((data: Httpresponse) => {
      if (data.status) {
        this.userProfile = data.data[0];
      }
    })
  }

  updateEditProfile() {
    this.profileForm.patchValue({
      userName: this.user.userName,
      userDob: this.userProfile.userDob,
      userGender: this.userProfile.userGender,
      userPrimaryEmail: this.userProfile.userPrimaryEmail,
      userAlternateEmail: this.userProfile.userAlternateEmail,
      userPrimaryPhone: this.userProfile.userPrimaryPhone,
      userAlternatePhone: this.userProfile.userAlternatePhone,
    });
  }

  toggleIsEditing() {
    this.editButton = "Edit";
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.updateEditProfile();
      this.editButton = "Cancel";
    }
  }

  onProfileSubmit() {
    let updatedProfile = this.profileForm.value;
    updatedProfile.userDob = formatDate(new Date(updatedProfile.userDob), "d-MM-YYYY", "en-US");
    this.userService.updateUser(this.user.userId, updatedProfile).subscribe((response: Httpresponse) => {
      if (response.status) {
        this.getUserDetails(this.user.userId);
        this.toggleIsEditing();
      } else {
        console.log(response.error);
      }
    })
    console.warn(updatedProfile);
  }

}
