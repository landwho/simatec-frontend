import { DashboardService } from './dashboard.service';
import { Component } from '@angular/core';
import { Product } from './dashboardProductModel.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products!: Product[];
  ingredient!: string;
  cities!: City[];
  selectedCities!: City[];

  constructor(private DashboardService: DashboardService) {}

  ngOnInit() {
      this.DashboardService.getProductsMini().then((data) => {
          this.products = data;
      });

      this.cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];

  }
}


interface City {
  name: string,
  code: string
}