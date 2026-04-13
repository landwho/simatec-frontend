import { Component, inject } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = '4dehr_web_frontend';
  private readonly AuthService = inject(AuthService);
  isLoged:boolean = false;

  ngOnInit(){
    this.AuthService.isLoggedIn$.subscribe(data=>{
      this.isLoged = data
    })
  }

}