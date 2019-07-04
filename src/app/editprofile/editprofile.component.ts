import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  result: any;
  updateForm: FormGroup;
  loading = false;
  submitted: Boolean = false;
  url: any;
  filedata: any;
  // firstname = '';
  // lastname = '';
  // image = '';
  // user_id = any ;
  // password = '';
  //getList: any;
  imgUrl: any = 'http://localhost:1802/';
  arr: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private Toastr: ToastrService) { }

  async ngOnInit() {
    this.updateForm = this.formBuilder.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      image: [''],
      username: ['', Validators.required],
      // tslint:disable-next-line: max-line-length
      password: ['']
    });
    this.userService.getData().subscribe((data) => {
      if (data) {
        this.result = data['data'];
        console.log(this.result._id);
        // console.log(this.updateForm)
        this.updateForm.patchValue({ id: this.result._id,
          firstname: this.result.firstname,
          lastname: this.result.lastname,
          username: this.result.username
      });
      this.url = this.result.image;
        // this.updateForm.patchValue({ firstname: this.getList.firstname});
        // console.log(this.updateForm.value)
        // this.firstname = data.firstname;
        // this.lastname = data.lastname;
        // this.url =  data.image;
        // this.url = this.result.image;
        // this.username = data.username;
        this.Toastr.success('user retrived SuccessFully');

      } else {
        this.Toastr.error(data['message']);
      }
    });
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    } else {
      const fd = new FormData();
      console.log(this.updateForm.value);
      fd.append('firstname', this.updateForm.value.firstname);
      fd.append('lastname', this.updateForm.value.lastname);
      fd.append('username', this.updateForm.value.username);
      fd.append('password', this.updateForm.value.password);
// tslint:disable-next-line: triple-equals
console.log('filedata', this.filedata);
// tslint:disable-next-line: triple-equals
      if (this.filedata != undefined) {
        fd.append('image', this.filedata);
      }
      this.userService.updateuser(fd).subscribe((data) => {
// tslint:disable-next-line: triple-equals
        if (data['status'] == 200 ) {
          this.Toastr.success('record updated SuccessFully.');
          // alert("Your quote was updated");
        } else {
          this.Toastr.error(data['message']);
          // alert("Some Problem");
        }
      });
    }
  }


  onFileChange(e) {
    this.imgUrl = '';
    this.url = '';
    if (e.target.files[0]) {
      if (e.target.files[0].name.match(/\.(jpeg|jpg)$/)) {
        this.filedata = e.target.files[0];
        // tslint:disable-next-line: prefer-const
        let reader = new FileReader();
        reader.readAsDataURL(this.filedata);

        reader.onload = (event) => {
          this.url = reader.result;
        };
      } else {
        this.Toastr.error('Only Image is Allow');
      }
    }
  }
}
