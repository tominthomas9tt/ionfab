import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { SignupUser } from 'src/app/common/models/signupuser';
import { AuthService } from 'src/app/common/services/auth.service';
import { ServerAuthService } from 'src/app/common/services/http/serverauth.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { isEmpty } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isLoggedin: boolean;

  user: SignupUser = {
    userName: "",
    userRoleId: "",
    userUsername: "",
    userPassword: ""
  };

  constructor(private formBuilder: FormBuilder,
    private serverauth: ServerAuthService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userUsername: ['', Validators.compose([Validators.required, Validators.email])],
      userPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.user = this.signupForm.value;
    if (!isEmpty(this.user.userName) && !isEmpty(this.user.userUsername) && !isEmpty(this.user.userPassword)) {
      this.user.userRoleId = "6";
      this.serverauth.createUser(this.user).subscribe((responseData: Httpresponse) => {
        if (responseData.status) {
          this.notificationService.showNotification("User created. Please login to continue.");
          this.router.navigateByUrl("/auth/login");
        } else {
          console.log(responseData.error);
        }
      });
    } else {
      this.notificationService.showNotification("Please enter valid credentials.");
    }
  }

}
