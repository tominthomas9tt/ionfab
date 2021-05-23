import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() { }

  signOut() {
    this.authService.signOut();
  }

}
