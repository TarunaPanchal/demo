import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted: Boolean = false;
  msg: string;
  messages: string[] = [];
  // submitted = false;
 
   constructor(  private Auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private Toastr: ToastrService) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z\d\.\_\-\+]{3,64}\@([A-Za-z\d]+)\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/)]],
      // tslint:disable-next-line: max-line-length
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)]],
      // tslint:disable-next-line: max-line-length
      // cpassword: ['', [Validators. required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)]],
    });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    //   // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //   event.preventDefault();
    // const target = event.target;
    // const username = target.querySelector('#username').value;
    // const password = target.querySelector('#password').value;
   else{
    var user = this.loginForm.value.username;
    var pass = this.loginForm.value.password;
   }
    this.Auth.getUserDetails(user, pass).subscribe(data => {
      if (data.success) {
        if (data.role === 'User') {
          // localStorage.setItem('id', JSON.stringify(data['id']));
          // this.Toastr.success('Successfully Login ');
          this.router.navigate(['editprofile']);
          this.Auth.setLoggedIn(true);
        } else if (data.role === 'Admin') {
          this.router.navigate(['admin']);
          this.Auth.setLoggedIn(true);
        }
      } else {
        // window.alert(data.message);
        this.Toastr.error(data['message']);
      }
    });
    // console.log(username, password);
  }
}
