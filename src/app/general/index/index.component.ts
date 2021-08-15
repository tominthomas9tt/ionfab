import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/common/configs/index.config';
import { StorageService } from 'src/app/common/services/local/storage.service';
import { StoredUserService } from 'src/app/common/services/local/storeduser.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  user;

  constructor(
    private storedUserService: StoredUserService,
    private route: ActivatedRoute,
    private router: Router,
    private storageServices: StorageService
  ) {



  }

  ngOnInit() {
    this.processInputParameters();
  }

  processInputParameters() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        const state = this.router.getCurrentNavigation().extras.state;


        // const serviceCategoryId: string = this.route.snapshot.queryParamMap.get('categoryId');
        // const serviceId: string = this.route.snapshot.queryParamMap.get('serviceId');

        const serviceCategoryId: string = state?.categoryId;
        const serviceId: string = state?.serviceId;

        const serviceSelected = {
          serviceCategoryId: serviceCategoryId,
          serviceId: serviceId,
        }

        if (serviceCategoryId && serviceId) {
          this.storageServices.setData(Constants.SERVICE_SELECTED_STORAGE, serviceSelected).then((data) => {
          }).finally(() => {
            this.navigationDecider();
          })
        } else {
          this.navigationDecider();
        }
      }
    });
  }

  navigationDecider() {
    this.storedUserService.getUser().then((data) => {
      this.user = data;
      console.log(this.user)
      if (this.user) {
        this.router.navigateByUrl("/dashboard/home", { replaceUrl: true });
      } else {
        this.router.navigateByUrl("/general/availability-check", { replaceUrl: true });
      }
    }).catch((error) => {
      console.log(error)
    })
  }

}
