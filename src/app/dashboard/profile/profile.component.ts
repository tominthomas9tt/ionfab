import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { User, UserDetails } from 'src/app/common/models/user';
import { UserService } from 'src/app/common/services/http/user.service';
import { formatDate } from "@angular/common";
import { isEmpty } from 'src/app/common/utils/utils';
import { Address } from 'src/app/common/models/address';
import { AddressHttpService } from 'src/app/common/services/http/address.service';
import { NotificationService } from 'src/app/common/services/local/notification.service';
import { StorageService } from 'src/app/common/services/local/storage.service';

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
  addresses: [Address];
  addressEditing: Address;
  editAddressButton: string = "Add";
  isEditingAddress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private userService: UserService,
    private addressService: AddressHttpService

  ) {
  }

  ngOnInit() {
    this.storageService.getData(USER_KEY).then(user => {
      this.user = user;
      if (isEmpty(this.userProfile)) {
        this.getUserDetails(this.user.userId);
        this.getAllAddresses(this.user.userId);
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
        this.notificationService.showNotification("Profile updated.");
        this.toggleIsEditing();
      } else {
        console.log(response.error);
      }
    })
    console.warn(updatedProfile);
  }

  addressForm = this.fb.group({
    addressline1: ['', Validators.required],
    addressline2: ['',],
    landmark: ['',],
    street: [''],
    city: [''],
    state: [''],
    pin: ['']
  });

  getAllAddresses(userId) {
    this.addressService.getAllAddresses(userId).subscribe((data: Httpresponse) => {
      if (data.status) {
        this.addresses = data.data;
      }
    })
  }

  updateEditAddress(addressToEdit: Address) {
    this.toggleIsEditingAddress();
    this.addressEditing = addressToEdit;
    this.addressForm.patchValue({
      addressline1: this.addressEditing.addressline1??null,
      addressline2: this.addressEditing.addressline2??null,
      landmark: this.addressEditing.landmark??null,
      street: this.addressEditing.street??null,
      city: this.addressEditing.city??null,
      state: this.addressEditing.state??null,
      pin: this.addressEditing.pin??null,
    });
  }

  onAddressSubmit() {
    let addressData: Address = this.addressForm.value;
    if (isEmpty(this.addressEditing)) {
      addressData.userId = this.user.userId;
      this.addressService.createAddress(addressData).subscribe((response: Httpresponse) => {
        if (response.status) {
          this.getAllAddresses(this.user.userId);
          this.notificationService.showNotification("Address created.");
          this.toggleIsEditingAddress();
        } else {
          console.log(response.error);
        }
      })
    } else {
      this.updateAddress(this.addressEditing.addressId, addressData)
      this.addressEditing = null;
      this.updateEditAddress({});
    }
    console.warn(addressData);
  }

  updateAddress(addressId, addressData) {
    this.addressService.updateAddress(addressId, addressData).subscribe((response: Httpresponse) => {
      if (response.status) {
        this.getAllAddresses(this.user.userId);
        this.notificationService.showNotification("Address updated.");
      } else {
        console.log(response.error);
      }
    })
  }

  markAddressAsPrimary(address: Address) {
    let addressData = { isPrimary: 2 };
    this.updateAddress(address.addressId, addressData);
  }

  deleteAddress(address: Address) {
    this.addressService.deleteAddress(address.addressId).subscribe((response: Httpresponse) => {
      if (response.status) {
        this.getAllAddresses(this.user.userId);
        this.notificationService.showNotification("Address deleted.");
      } else {
        console.log(response.error);
      }
    })
  }

  toggleIsEditingAddress() {
    this.editAddressButton = "Add";
    this.isEditingAddress = !this.isEditingAddress;
    if (this.isEditingAddress) {
      this.editAddressButton = "Update";
    }
  }

}
