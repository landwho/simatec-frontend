import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone:false
})
export class LoginComponent {

  value1: string ='';
  value2: string ='';

constructor(private Router:Router, private LoginService:LoginService){}

loginForm!: FormGroup;
    
submitted = false;

ngOnInit() {
    this.loginForm = new FormGroup({
        'idUser': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
}

onSubmit() { 
  console.log(this.loginForm.value)

  this.LoginService.signIn(this.loginForm.value).subscribe({
    next:(data)=>{
      this.submitted = true;
      this.Router.navigate(['simatec/dashboard'])
      // console.log(data)
    },
    error:(err)=>{
      console.log(err)
    }
  })
  
    // alert(JSON.stringify(this.loginForm.value));
}

}

