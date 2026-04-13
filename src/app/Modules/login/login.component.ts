import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { Validators,FormControl,FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone:true,
    imports:[
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule
    ]
})
export class LoginComponent {

  value1: string ='';
  value2: string ='';

constructor(private Router:Router, private LoginService:LoginService){}

loginForm!: FormGroup;
submitted = false;
showPassword = false;

ngOnInit() {
  document.body.style.background = 'linear-gradient(135deg, #0d6efd, #0a3d62)';

    this.loginForm = new FormGroup({
        'idUser': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
}

  onSubmit() { 
    this.LoginService.signIn(this.loginForm.value).subscribe({
      next:(data)=>{
        this.submitted = true;
        
        this.Router.navigate(['/simatec/ordenes']);
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(){
    document.body.style.background = '';
  }

}

