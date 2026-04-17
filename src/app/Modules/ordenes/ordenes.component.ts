import { AfterViewInit, Component, inject, ViewChild, effect  } from '@angular/core';
import { OrdenesService } from './ordenes.service';
import { OrderListInterface } from './model/order-list.interface';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
  standalone:true,
  imports:[
    DatePipe, MatTableModule,
    MatPaginatorModule, MatCardModule,
    MatIconModule
]
})
export class OrdenesComponent implements AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private readonly OrdenesService = inject(OrdenesService);
  dataSource = new MatTableDataSource<OrderListInterface>([]);

  displayedColumns: string[] = [
    'ordernumber',
    'dateorder',
    'firstname',
    'lastname',
    'gender',
    'patientcode',
    'status'
  ];
  
  constructor(){
    effect(() => {
      const data = this.OrdenesService.orders$();
      this.dataSource.data = [...data]; 
    });
  }

  ngOnInit() {
    document.body.style.background = '#faf9fd';
    this.obtenerListadoDeOrdenes()      
  }

  obtenerListadoDeOrdenes() {
    this.OrdenesService.getOrderList()
      .subscribe((data: OrderListInterface[]) => {
        this.OrdenesService.setOrders(data); 
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}