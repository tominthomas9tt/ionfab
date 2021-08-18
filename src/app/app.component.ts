import { Component } from '@angular/core';
import { FcmService } from './common/services/local/fcm.service';
import { StorageService } from './common/services/local/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageService:StorageService,
    private fcmService: FcmService) { }

  async ngOnInit() {
    this.storageService.init();
    this.fcmService.initPush();
  }
}
