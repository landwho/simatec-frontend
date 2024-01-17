import { Component } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  value1: string ='';
  value2: string ='';

constructor(private Router:Router){}

loginForm!: FormGroup;
    
submitted = false;

ngOnInit() {
    this.loginForm = new FormGroup({
        'login': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
}

onSubmit() { 
    this.submitted = true;
    this.Router.navigate(['simatec/dashboard'])
    // alert(JSON.stringify(this.loginForm.value));
}

}

