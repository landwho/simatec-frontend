import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CrearNuevaOrdenModalService } from './crear-nueva-orden-modal.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { SharedServices } from '@shared/shared-services/shared-services.service';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PhysicianInterfaceModel,AreaInterfaceModel } from '@shared/shared-intreface.model';
import { OrderInterfaceModel } from './crear-nueva-orden.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './crear-nueva-orden-modal.component.html',
    styleUrls: ['./crear-nueva-orden-modal.component.css'],
    standalone:true,
    providers: [provideNativeDateAdapter()],
    imports: [
        MatDialogModule, MatFormFieldModule,
        MatInputModule, FormsModule, MatButtonModule,
        MatCardModule, MatIconModule, MatSelectModule,
        MatDatepickerModule, MatRadioModule,
        MatExpansionModule, MatCheckboxModule,
        ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrearNuevaOrdenModalComponent {

    private readonly CrearNuevaOrdenModalService = inject(CrearNuevaOrdenModalService);
    private readonly SharedServices = inject(SharedServices);
    private ChangeDetectorRef = inject(ChangeDetectorRef);
    readonly dialogRef = inject(MatDialogRef<CrearNuevaOrdenModalComponent>);
    readonly panelOpenState = signal(false);
    private readonly FormBuilder = inject(FormBuilder);

    physicianControl = new FormControl<number | null>(null);
    form!: FormGroup
    areasForm: FormGroup = this.FormBuilder.group({});

    patientCardText:string = "Informacion del paciente";
    areaCardText:string = "Estudios relacionados";
    resumenCardText:string = "resumen de la orden"
    physicians: PhysicianInterfaceModel[]= []
    areas:AreaInterfaceModel[] =[]
   

    constructor(){
        this.initForm();
        this.getAreas();
        this.getCatalogos();
    }

    ngOnInit(){
        
        this.getAreas();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


    getAreas() {
        this.SharedServices.getAreas().subscribe({
            next: data => {
            this.areas = data;
             this.ChangeDetectorRef.detectChanges();
              this.buildAreaControls(); // 👈 clave
            },
            error: err => {}
        });
    }

    getCatalogos(){
        this.CrearNuevaOrdenModalService.getPhysician().subscribe(data=>{
            console.log(data.physician)
            this.physicians = data.physician
        })
    }





    initForm() {
        this.form = this.FormBuilder.group({
            idOrderType:    [1],
            idOrigin:       [1],
            idDoctor:       [null],
            idPatient:      [123],
            patientCode:    [''],
            patientName:    [''],
            birth:          [''],
            phone:          [''],
            email:          [''],
            details: this.FormBuilder.array([]) ,

            firstName:      [''],
            lastName:       [''],
            gender:         [''],
            observaciones:  [''],
            areas: this.FormBuilder.group({}) 

        });
    }

    readonly toppings = this.FormBuilder.group({
        pepperoni: false,
        extracheese: false,
        mushroom: false,
    });

    // 🔥 crear checkboxes dinámicos por área
buildAreaControls() {
  const group: any = {};

  this.areas.forEach(area => {
    group[area.idarea] = this.FormBuilder.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    });
  });

  this.areasForm = this.FormBuilder.group(group);
}

    crearOrden() {

        const payload: OrderInterfaceModel = this.form.value;

        console.log(payload)

        // this.CrearNuevaOrdenModalService.createOrder(payload).subscribe(res => {
        //     console.log(res);
        // });



          this.CrearNuevaOrdenModalService.createOrder(payload).subscribe({
            next: data => {
                console.log(data);
            // this.areas = data;
            //  this.ChangeDetectorRef.detectChanges();
            //   this.buildAreaControls(); // 👈 clave
            },
            error: err => {
            console.error('Error areas:', err);
            }
        });
    }



    get selectedAreas() {
    if (!this.areasForm) return []; // 👈 evita el error

    const result: any[] = [];
    const values = this.areasForm.value;

    this.areas.forEach(area => {
        const areaValues = values[area.idarea];

        if (!areaValues) return;

        const selected = Object.entries(areaValues)
        .filter(([_, v]) => v)
        .map(([k]) => k);

        if (selected.length > 0) {
        result.push({
            area: area.name,
            items: selected
        });
        }
    });

    return result;
    }

}