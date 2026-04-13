import { Component, inject } from '@angular/core';
import { CrearNuevaOrdenModalService } from './crear-nueva-orden-modal.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  templateUrl: './crear-nueva-orden-modal.component.html',
  styleUrls: ['./crear-nueva-orden-modal.component.css'],
  standalone:true,
  imports:[
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule, FormsModule, MatButtonModule
  ]
})
export class CrearNuevaOrdenModalComponent {

    private readonly CrearNuevaOrdenModalService = inject(CrearNuevaOrdenModalService);
     readonly dialogRef = inject(MatDialogRef<CrearNuevaOrdenModalComponent>);
    animal:any = 'trololo'

  onNoClick(): void {
    this.dialogRef.close();
  }
}