import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  url: any;
  filedata: any;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private auth: AuthService,
    private Toastr: ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      image: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z\d\.\_\-\+]{3,64}\@([A-Za-z\d]+)\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/)]],
      // tslint:disable-next-line: max-line-length
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)]]
    });
  }
  get f() { return this.registerForm.controls; }

  onSelectFile(e) {
    console.log(e);
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

    // if(event.target.files && event.target.files.length > 0) {
    //   let file = event.target.files[0];
    //   console.log('fileeeeeeeeeeeee',file)
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.registerForm.get('image').setValue({
    //       filename: file.name,
    //       filetype: file.type
    //     })

    //   };

       // console.log('this image3',this.registerForm.value.image)
   // }
    // var input = document.getElementById("image");
    // var fReader = new FileReader();
    // fReader.readAsDataURL(input.files[0]);
    // fReader.onloadend = function(event){
    //     var img = document.getElementById("yourImgTag");
    //     img.src = event.target.result;
    // }
    // var file = event.target.files[0];
    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   // The file's text will be printed here
    //   console.log(e.target.result)
    // };

    // reader.readAsText(file);
  }
  // tslint:disable-next-line: deprecation
  onSubmit(event) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
   // event.preventDefault();
   // const target = event.target;
    // tslint:disable-next-line: no-shadowed-variable
    const error = [];
    // const firstname = target.querySelector('#firstname').value;
    // const lastname = target.querySelector('#lastname').value;
    // const image =  this.filedata;
    // const username = target.querySelector('#username').value;
    // const password = target.querySelector('#password').value;
  //  console.log('imageeeee', image);
    // tslint:disable-next-line: triple-equals

    const fd = new FormData();
      fd.append('firstname', this.registerForm.value.firstname);
      fd.append('lastname', this.registerForm.value.lastname);
      fd.append('username', this.registerForm.value.username);
      fd.append('password', this.registerForm.value.password);
      fd.append('image', this.filedata);
     // console.log(this.registerForm.value ,'-----',this.filedata);

    if (error.length === 0) {
      this.auth.registerUser(fd).subscribe(data => {
        if (data) {
          this.Toastr.success('Successfully Register');
          // alert('Sucessfully Register');
          this.router.navigate(['login']);
        }
      });
    }
    // console.log(username, password);
  }

}
