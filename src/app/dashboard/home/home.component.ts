import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, PopoverController } from '@ionic/angular';
import { Constants } from 'src/app/common/configs/index.config';
import { Address } from 'src/app/common/models/address';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { PayInitializer } from 'src/app/common/models/payment.model';
import { Tender } from 'src/app/common/models/tenders.model';
import { User } from 'src/app/common/models/user';
import { ServicecategoriesService } from 'src/app/common/services/http/servicecategory.service';
import { ServicesService } from 'src/app/common/services/http/services.service';
import { TenderService } from 'src/app/common/services/http/tenders.service';
import { LocalPaymentService } from 'src/app/common/services/localpayment.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { StoreService } from 'src/app/common/services/store.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { SearchService } from 'src/app/common/store/search.service';
import { misDateFormatted } from 'src/app/common/utils/utils';
import { NewjobComponent } from '../components/newjob/newjob.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';

const INSPECTION_FEE_TYPE = Constants.PAYMENT_TYPES.INSPECTION_FEE;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('subServiceSlides') slides: IonSlides;

  user: User;

  items = [];
  isLoading = true;

  selectedCategory;
  selectedSubcategory;
  selectedSubcategory1;
  selectedAddress: Address;

  subServices;
  showSubservices = false;

  tenderData: Tender;

  vendorsFound = 0;

  dataForm: FormGroup;

  isSubmitted: boolean = false;
  isSubmitDisabled: boolean = false;

  today = new Date();
  todayTimeOptions = [
    'Within 1 Hr',
    'Within 2 Hr',
    'Within 4 Hr',
    'Within 6 Hr',
    'End Of Day (EOD)',
  ];

  laterTimeOptions = [
    '8 AM - 10 AM',
    '10 AM - 12 PM',
    '12 PM - 2 PM',
    '2 PM - 4 PM',
    '4 PM - 6 PM',
    '6 PM - 8 PM',
  ];

  inspectionAmount = 350;

  scheduledFor = 1;
  timeOptions = this.todayTimeOptions;

  inspectionRequired = false;
  count;

  constructor(
    private searchService: SearchService,
    private paymentService: LocalPaymentService,
    private storedUserService: StoredUserService,
    private STORE: StoreService,
    private popoverController: PopoverController,
    private serviceCategoryServices: ServicecategoriesService,
    private storageService: StorageService,
    private servicesService: ServicesService,
    private formBuilder: FormBuilder,
    private tenderService: TenderService,
    private notificationSrevice: NotificationService
  ) { }

  ngOnInit() {
    this.getStoredUser();
    this.selectedCategory = this.serviceCategoryServices.getLocalSeriveCategoryById(1);
    this.checkForSelectedService();
    this.generateRandomItem();
    this.initiateForm();
    // this.presentWelcome();
    this.searchSubscribe();
  }

  getStoredUser() {
    this.storedUserService.getUser().then((data) => {
      this.user = data;
    })
  }

  checkForSelectedService() {
    this.storageService.getData(Constants.SERVICE_SELECTED_STORAGE).then((data) => {
      let selectedService = data;
      if (selectedService.serviceCategoryId) {
        let category = this.serviceCategoryServices.getLocalSeriveCategoryById(selectedService.serviceCategoryId);
        this.onCategoryChanged(category);
      }
      if (selectedService.serviceId) {
        this.servicesService.getServiceById(selectedService.serviceId).subscribe((dataResponse: Httpresponse) => {
          if (dataResponse.status) {
            this.selectedSubcategory1 = dataResponse.data[0];
            this.onFilterChanged(dataResponse.data[0]);
          }
        });
      }
    }).finally(() => {
      this.storageService.deleteData(Constants.SERVICE_SELECTED_STORAGE).then((data) => {
      })
    })
  };

  searchSubscribe() {
    this.searchService.searchChanged$.subscribe((data) => {
      if (data) {
        this.onSearchService(data);
      }
    })
  }

  onSearchService(service) {
    let category = this.serviceCategoryServices.getLocalSeriveCategoryById(service.serviceCategoryId);
    if (this.selectedCategory.id != service.serviceCategoryId) {
      this.onCategoryChanged(category);
    }
    this.onFilterChanged(service);
    this.selectedSubcategory1 = service;
  }

  onCategoryChanged(categoryData) {
    this.selectedCategory = categoryData;
    this.selectedSubcategory1 = null;
    this.generateRandomItem();
  }

  onFilterChanged(filterData) {
    this.selectedSubcategory = filterData;
    this.generateRandomItem();
    this.getSubServices();
    this.initiateForm();
  }

  getSubServices() {
    let selSubCat = this.selectedSubcategory;
    if (selSubCat?.hasChildren && selSubCat?.hasChildren > 0) {
      this.servicesService.getAllServices({ parentServiceId: this.selectedSubcategory.id }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status && selSubCat.id == this.selectedSubcategory?.id) {
          this.showSubservices = true;
          this.subServices = dataResponse.data
        }
      })
    } else {
      this.showSubservices = false;
    }

  }

  getRandomArbitrary(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  generateRandomItem() {
    this.isLoading = true;

    this.items = [];
    let count = parseInt(this.getRandomArbitrary(20, 50));
    for (let i = 0; i < count; i++) {
      let randomNumber = parseInt(this.getRandomArbitrary(1000, 10000));
      let rating = this.getRandomArbitrary(1, 5);
      this.items.push({
        id: randomNumber,
        name: "Vendor " + randomNumber,
        rating: rating
      })
    }
    this.vendorsFound = count;
    this.isLoading = false;
  }

  initiateForm() {
    this.isSubmitted = false;
    this.isSubmitDisabled = false;
    this.dataForm = this.formBuilder.group({
      serviceSub: [''],
      inspectionRequired: [false],
      jobDate: [this.today],
      jobTime: ['', Validators.required],
      jobDecription: [''],
    });
  }

  inspectionToggled() {
    this.inspectionRequired = !this.inspectionRequired;
  }

  toggleScheduledFor() {
    this.dataForm.get('jobTime').setValue("");
    if (this.scheduledFor == 2) {
      this.scheduledFor = 1;
      this.timeOptions = this.todayTimeOptions;
    } else {
      this.scheduledFor = 2;
      this.timeOptions = this.laterTimeOptions;
    }
  }

  sliderOptions = {
    slidesPerView: 3,
    // spaceBetween: 5,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 4,
        // spaceBetween: 5
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 6,
        // spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 8,
        // spaceBetween: 40
      }
    },
    zoom: false, grabCursor: true
  };

  get errorControl() {
    return this.dataForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.dataForm.valid) {
      this.isSubmitDisabled = true;
      this.STORE.getDefaultAddress().then((data) => {
        this.selectedAddress = data;
        let dataSample = this.dataForm.value;
        let detailData: Tender = {
          userId: this.user?.userId,
          serviceCategoryId: this.selectedCategory?.id,
          serviceId: this.selectedSubcategory?.id,
          subServiceId: dataSample?.serviceSub?.id ?? null,
          isInspectionRequired: (dataSample?.inspectionRequired) ? 2 : 1,
          isOpenToInspect: (dataSample?.inspectionRequired) ? 2 : 1,
          isOpenToConnect: (dataSample?.inspectionRequired) ? 1 : 2,
          addressId: this.selectedAddress?.addressId,
          jobDate: misDateFormatted(dataSample.jobDate ?? new Date(), 'YYYY-MM-DD'),
          jobTime: dataSample.jobTime,
          description: dataSample.jobDecription,
          status: (dataSample?.inspectionRequired) ? 9 : 12
        }
        this.tenderService.create(detailData).subscribe((dataResponse: Httpresponse) => {
          if (dataResponse.status) {
            this.tenderData = dataResponse.data[0];
            if (this.inspectionRequired) {
              this.initiateForm();
              this.initiateInspectionPayment();
            } else {
              this.isSubmitDisabled = false;
              this.presentNewJob();
            }
          } else {
            console.log(dataResponse.error);
            this.isSubmitDisabled = false;
            this.notificationSrevice.showGeneralError();
          }
        })
      }).catch((error) => {
        console.log(error);
        this.isSubmitDisabled = false;
        this.notificationSrevice.showGeneralError("Select default address.")
      })
      setTimeout(() => {
        this.isSubmitDisabled = false;
      }, 5000)
    } else {
      return false;
    }
  }

  async initiateInspectionPayment() {
    let paymentInfo: PayInitializer = {
      type: INSPECTION_FEE_TYPE,
      name: this.user.userName,
      email: this.user.userUsername,
      amountPayable: this.inspectionAmount,
      referenceNo: this.tenderData.id.toString(),
      remarks: "Inspection fees"
    };
    this.paymentService.init(paymentInfo).then((data) => {
      if (data.status && data.status == true) {
        this.isPaymentSuccess(data.transactionId);
      }
    }).catch((error) => {
      console.log(error);
    })

  }

  isPaymentSuccess(paymentId: number) {
    let detailData: Tender = {
      status: 10,
      isPaidForInspection: 2,
      inspectionPaymentId: paymentId
    };
    this.tenderService.inspectionPaymentSuccess(this.tenderData?.id, detailData).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.tenderData = dataResponse.data[0];
        this.presentNewJob()
      } else {
        console.log(dataResponse.error);
        this.notificationSrevice.showGeneralError("Payment failed.")
      }
    })
  }

  async presentNewJob() {
    const popover = await this.popoverController.create({
      component: NewjobComponent,
      mode: 'md',
      backdropDismiss: false,
      translucent: true,
      componentProps: {
        tenderData: this.tenderData
      }
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
  }

  async presentWelcome() {
    const popover = await this.popoverController.create({
      component: WelcomeComponent,
      cssClass: 'my-welcome-customer-class',
      // event: ev,
      mode: 'md',
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }


}
