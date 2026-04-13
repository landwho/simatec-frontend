import { DashboardService } from './dashboard.service';
import { Component } from '@angular/core';
import { Product } from './dashboardProductModel.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:false
})
export class DashboardComponent {
  products!: Product[];
  ingredient!: string;
  cities!: City[];
  selectedCities!: City[];

  constructor(private DashboardService: DashboardService) {}

  ngOnInit() {
     
    this.obtenerCLientes()

  }

  obtenerCLientes(){
    this.DashboardService.getOrderList().subscribe(data=>{
      console.log(data)
    })
  }

}





interface City {
  name: string,
  code: string
}