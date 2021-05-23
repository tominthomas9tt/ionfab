import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-inprogress',
  templateUrl: './inprogress.component.html',
  styleUrls: ['./inprogress.component.scss'],
})
export class InprogressComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() { }

  signOut() {
    this.authService.signOut();
  }

}
