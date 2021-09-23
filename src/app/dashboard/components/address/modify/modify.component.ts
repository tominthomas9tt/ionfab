import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Patterns } from 'src/app/common/configs/patterns.config';
import { Address } from 'src/app/common/models/address';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { PincodeFilter } from 'src/app/common/models/pincodes.model';
import { AddressHttpService } from 'src/app/common/services/http/address.service';
import { DistrictService } from 'src/app/common/services/http/district.service';
import { MunicipalityService } from 'src/app/common/services/http/municipality.service';
import { PincodeService } from 'src/app/common/services/http/pincodes.service';
import { StateService } from 'src/app/common/services/http/state.service';
import { isEmpty } from 'src/app/common/utils/utils';
import { AddressService } from '../../../../common/services/local/address.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
})
export class ModifyComponent implements OnInit {

  @Input() addressEditing;
  @Input() isDismissable = true;

  isEditingAddress: boolean = false;
  action = "Add";

  municipalities;
  districts;
  states;

  dataForm: FormGroup;
  isSubmitted: boolean;
  isSubmitDisabled: boolean;

  constructor(
    private addressService: AddressService,
    private districtService: DistrictService,
    private formBuilder: FormBuilder,
    private pincodeService: PincodeService,
    private modalController: ModalController,
    private municipalityService: MunicipalityService,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.initiateForm();
    if (this.addressEditing) {
      this.updateEditAddress(this.addressEditing);
    }

    this.getMunicipalities();
    this.getDistricts();
    this.getStates();
  }

  initiateForm() {
    this.dataForm = this.formBuilder.group({
      addressline1: ['', Validators.required],
      addressline2: ['',],
      landmark: ['',],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.compose([Validators.required, Validators.pattern(Patterns.PIN)])]
    });
  }

  getStates() {
    this.stateService.getAll({ status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.states = dataResponse.data;
        if (this.addressEditing) {
          let selectedState = this.states[this.states?.findIndex(item => item.name == this.addressEditing.state)];
          this.dataForm.patchValue({
            state: selectedState
          })
        }
      }
    })
  }

  getDistricts() {
    this.districtService.getAll({ status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.districts = dataResponse.data;
        if (this.addressEditing) {
          let selectedDistrict = this.districts[this.districts?.findIndex(item => item.name == this.addressEditing.city)];
          this.dataForm.patchValue({
            city: selectedDistrict
          })
        }
      }
    })
  }

  getMunicipalities() {
    this.municipalityService.getAll({ status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.municipalities = dataResponse.data;
        if (this.addressEditing) {
          let selectedMunicipality = this.municipalities[this.municipalities?.findIndex(item => item.name == this.addressEditing.street)];
          this.dataForm.patchValue({
            street: selectedMunicipality
          })
        }
      }
    })
  }

  pincodeChanged() {
    let pincode = this.dataForm.get('pin').value;
    /* Auto detect pincode data from database */
    // this.getPincodeDetails(pincode);
  }

  getPincodeDetails(pincode) {
    if (!isEmpty(pincode) && pincode.toString().length == 6) {
      let pincodeFilter: PincodeFilter = {
        pincode: pincode,
        offset: 0,
        limit: 1,
        status: 2,
        astatus: 2
      };
      if (!isEmpty(pincodeFilter)) {
        this.pincodeService.getAll(pincodeFilter).subscribe((dataResponse: Httpresponse) => {
          if (dataResponse.status && dataResponse?.data.length > 0) {
            let pincode = dataResponse?.data[0];
            this.dataForm.patchValue({
              street: pincode.taluk,
              city: pincode.district,
              state: pincode.state,
            })
          }
        })
      }
    }
  }

  get errorControl() {
    return this.dataForm.controls;
  }

  updateEditAddress(addressToEdit: Address) {
    this.toggleIsEditingAddress();
    this.addressEditing = addressToEdit;
    this.dataForm.patchValue({
      addressline1: this.addressEditing.addressline1 ?? null,
      addressline2: this.addressEditing.addressline2 ?? null,
      landmark: this.addressEditing.landmark ?? null,
      street: this.addressEditing.street ?? null,
      city: this.addressEditing.city ?? null,
      state: this.addressEditing.state ?? null,
      pin: this.addressEditing.pin ?? null,
    });
  }

  onAddressSubmit() {
    this.isSubmitted = true;
    if (this.dataForm.valid) {
      this.isSubmitDisabled = true;
      let formData = this.dataForm.value
      let addressData: Address = formData;
      addressData.state = formData?.state?.name;
      addressData.municipalityId = formData?.street?.id;
      addressData.street = formData?.street?.name;
      addressData.city = formData?.city?.name;
      if (!this.addressEditing) {
        this.addressService.createAddress(addressData).subscribe((response: Httpresponse) => {
          if (response.status) {
            this.addressService.notify("Address added to your account.")
            this.toggleIsEditingAddress();
            this.addressService.getAllAddresses();
            this.dismiss(true);
          } else {
            this.addressService.notify();
            console.log(response.error);
          }
        })
      } else {
        this.updateAddress(this.addressEditing.addressId, addressData)
      }
      setTimeout(() => {
        this.isSubmitDisabled = false;
      }, 5000)
    }
  }

  updateAddress(addressId, addressData) {
    this.addressService.updateAddress(addressId, addressData).subscribe((response: Httpresponse) => {
      if (response.status) {
        this.addressService.notify("Address updated.")
        this.toggleIsEditingAddress();
        this.addressService.getAllAddresses();
        this.addressEditing = null;
        this.updateEditAddress({});
        this.dismiss();
      } else {
        this.addressService.notify();
        console.log(response.error);
      }
    })
  }

  toggleIsEditingAddress() {
    this.action = "Add";
    this.isEditingAddress = !this.isEditingAddress;
    if (this.isEditingAddress) {
      this.action = "Update";
    }
  }

  dismiss(data = false) {
    if (this.isDismissable || data == true) {
      this.modalController.dismiss(data);
    } else {
      this.addressService.notify("Please save address to continue.");
    }
  }
}
