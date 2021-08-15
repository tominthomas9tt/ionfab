import { Component } from '@angular/core';
import { StorageService } from './common/services/local/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageService:StorageService) { }

  async ngOnInit() {
    this.storageService.init();
  }
}
