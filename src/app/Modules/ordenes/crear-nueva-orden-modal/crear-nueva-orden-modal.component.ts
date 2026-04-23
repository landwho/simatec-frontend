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
import { AreaCatalogInterfaceModel, OrderTypeInterfaceModel, OriginInterfaceModel } from '@shared/shared-services/shared-services.interface';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { OrderListInterface } from '../model/order-list.interface';
import { Validators } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';

import { OrdenesService } from '../ordenes.service';

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
        ReactiveFormsModule, CommonModule,
        MatListModule,
        TranslocoModule,
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
    private readonly OrdenesService = inject(OrdenesService)

    physicianControl = new FormControl<number | null>(null);
    form!: FormGroup
    areasForm: FormGroup = this.FormBuilder.group({});

    physicians: PhysicianInterfaceModel[]= []
    areas:AreaCatalogInterfaceModel[] =[];
    origin:OriginInterfaceModel[] = [];
    orderType:OrderTypeInterfaceModel[]=[];
    selectedDetails: any[] = [];

    constructor(){
        this.initForm();
        this.getCatalogos();
    }

    ngOnInit(){
        this.getCatalogos();
        this.form.valueChanges.subscribe(() => {
            this.selectedDetails = this.getDetails();
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getCatalogos(){
        this.CrearNuevaOrdenModalService.getCatalogs().subscribe(data=>{
            console.log(data.physician)
            this.physicians = data.physician
            this.origin = data.origin
            this.orderType = data.orderType
            this.areas = data.test
            if (!this.areasForm || Object.keys(this.areasForm.controls).length === 0) {
                this.buildAreaControls(); // 👈 solo una vez
            }
            this.ChangeDetectorRef.detectChanges();
        })
    }


    initForm() {
        this.form = this.FormBuilder.group({
            idOrderType: [null, Validators.required],
            idOrigin:    [null, Validators.required],
            idDoctor:    [null, Validators.required],

            patientCode: [null, Validators.required],
            patientName: [null],

            birth:       [null, Validators.required],
            phone:       [''],
            email:       ['', Validators.email],

            firstName:   [null, Validators.required],
            lastName:    [null, Validators.required],
            gender:      [null, Validators.required],
            notes:       [''],
            details:     this.FormBuilder.array([])
            // details:     this.FormBuilder.array([], Validators.required)
        });
    }

    buildAreaControls() {
        const group: any = {};
        this.areas.forEach(area => {
            const testsGroup: any = {};
            area.tests.forEach(test => {
            testsGroup[test.idTest.toString()] = this.FormBuilder.control(false);
            });
            group[area.idArea.toString()] = this.FormBuilder.group(testsGroup);
        });
        this.areasForm = this.FormBuilder.group(group);
    }

    crearOrden() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const payload: OrderInterfaceModel = {
            ...this.form.value,
            details: this.getDetails()
        };
        this.CrearNuevaOrdenModalService.createOrder(payload).subscribe({
            next: data => {
                const nuevaOrden: OrderListInterface = {
                    ordernumber:    payload.ordernumber,
                    dateorder:      payload.birth,
                    firstname:      payload.firstName,
                    lastname:       payload.lastName,
                    patientcode:    payload.patientCode,
                    status:         payload.status,
                    gender:         payload.gender
                };
                this.OrdenesService.addOrder(nuevaOrden);
            },
            error: err => {
            console.error('Error:', err);
            }
        });
    }

    get details(): { idTest: number; priority: number }[] {
        if (!this.areasForm) return [];

        const result: any[] = [];
        const values = this.areasForm.value;

        Object.keys(values).forEach(areaId => {
            const tests = values[areaId];

            Object.keys(tests).forEach(testId => {
            if (tests[testId]) {
                result.push({
                idTest: Number(testId),
                priority: 0
                });
            }
            });
        });

        return result;
    }


    getDetails(): { idTest: number; priority: number }[] {
        if (!this.areasForm) return [];

        const result: any[] = [];
        const values = this.areasForm.value;

        Object.keys(values).forEach(areaId => {
            const tests = values[areaId];

            Object.keys(tests).forEach(testId => {
            if (tests[testId]) {
                result.push({
                idTest: Number(testId),
                priority: 0
                });
            }
            });
        });

        return result;
    }

    get selectedTests() {
        if (!this.areasForm || !this.areas) return [];

        const values = this.areasForm.value;
        const result: any[] = [];

        this.areas.forEach(area => {
            const testsGroup = values[area.idArea];

            if (!testsGroup) return;

            Object.keys(testsGroup).forEach(testId => {
            if (testsGroup[testId]) {
                const test = area.tests.find(t => t.idTest === Number(testId));

                if (test) {
                result.push({
                    idTest: test.idTest,
                    name: test.testName,
                    area: area.areaName,
                    price: test.price
                });
                }
            }
            });
        });

        return result;
    }

    animatingId: number | null = null;

    removeTest(testId: number, areaId: number) {

        this.animatingId = testId;

  setTimeout(() => {
    this._removeTestReal(testId, areaId);
    this.animatingId = null;
  }, 400); // duración de animación

      
    }

    _removeTestReal(idTest: number, idArea: number) {
    const control = this.areasForm
            .get(idTest.toString())
            ?.get(idArea.toString());

            control?.setValue(false);
    }

    getAreaId(testId: number): number {
        for (const area of this.areas) {
            if (area.tests.some(t => t.idTest === testId)) {
            return area.idArea;
            }
        }
        return 0;
    }

    get totalPrice(): number {
        return this.selectedTests.reduce((acc, test) => acc + (test.price || 0), 0);
    }


    ngOnDestroy(){

    }

}