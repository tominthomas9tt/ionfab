import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { User } from 'src/app/common/models/user';
import { TenderService } from 'src/app/common/services/http/tenders.service';
import { StoreService } from 'src/app/common/services/local/store.service';
import { misDateFormatted } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading = false;
  pageSizeOptions = [5, 10, 20];
  pageSize = 10;
  pageIndex = 0;
  resultsLength = 0;

  displayedColumns: string[] = ['slno', 'tenderNo', 'date', 'service', 'status'];
  dataSource;

  user: User;

  jobs;
  name = "";

  constructor(
    private STORE: StoreService,
    private tenderService: TenderService
  ) { }

  ngOnInit() {
    this.getStoredUser();
  }

  getStoredUser() {
    this.STORE.getUser().then((data) => {
      this.user = data;
      this.getAllJobs();
    })
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe((data) => {
    });
    this.paginator.page.subscribe((paginatorData: {
      length: number
      pageIndex: number
      pageSize: number
      previousPageIndex: number
    }) => {
      if (paginatorData.pageSize != this.pageSize) {
        this.pageSize = paginatorData.pageSize;
        this.getAllJobs();
      }
      if (paginatorData.pageIndex != this.pageIndex) {
        this.pageIndex = paginatorData.pageIndex;
        this.getAllJobs();
      }
    })
  }

  getAllJobs() {
    this.isLoading = true;
    this.tenderService.getAll({ userId: this.user.userId, offset: this.pageIndex * this.pageSize, limit: this.pageSize, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.jobs = dataResponse.data;
        this.setDataSource(this.jobs)
        if (dataResponse.infoDtls) {
          this.resultsLength = dataResponse.infoDtls[0].totalResults;
        }
      } else {
        this.setDataSource([]);
      }
      this.isLoading = false;
    })
  }

  dateFormat(date) {
    return misDateFormatted(date, "DD-MM-YYYY hh:mm:ss A");
  }

  applyFilter(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
    if (this.name.length > 3 || this.name.length == 0) {
      this.getAllJobs();
    }
  }

  clearFilter() {
    if (this.name != "") {
      this.name = "";
      this.getAllJobs();
    }
  }

  setDataSource(data) {
    this.dataSource = new MatTableDataSource<any>(data);
    // this.dataSource.sort = this.sort;
  }

  // async vewDetails(row) {
  //   const modal = await this.modalController.create({
  //     component: BusinessDetailsComponent,
  //     cssClass: "my-custom-modal-css",
  //     componentProps: {
  //       metaData: row
  //     },

  //   });
  //   await modal.present();
  //   const { data } = await modal.onWillDismiss();
  //   if (data) {
  //     if (data && data.edit) {

  //     }
  //   }
  // }

}
