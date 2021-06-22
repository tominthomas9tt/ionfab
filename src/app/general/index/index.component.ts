import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/common/configs/index.config';
import { StorageService } from 'src/app/common/services/storage.service';
import { isEmpty } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private storageServices: StorageService
  ) { }

  ngOnInit() {
    const serviceCategoryId: string = this.route.snapshot.queryParamMap.get('categoryId');
    const serviceId: string = this.route.snapshot.queryParamMap.get('serviceId');
    const subServiceId: string = this.route.snapshot.queryParamMap.get('subServiceId');

    const serviceSelected = {
      serviceCategoryId: serviceCategoryId,
      serviceId: serviceId,
      subServiceId: subServiceId
    }

    if (serviceCategoryId && serviceId) {
      this.storageServices.setData(Constants.SERVICE_SELECTED_STORAGE, serviceSelected).then((data) => {
        console.log("Service saved.");
      }).finally(() => {
        this.router.navigateByUrl("/dashboard/home", { replaceUrl: true });
      })
    }else{
      this.router.navigateByUrl("/dashboard/home", { replaceUrl: true });
    }

  }

}
