import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedModule } from '@shared/sharedModule.module';
import { MatIconModule } from '@angular/material/icon';
// import { SistematicMenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuService } from './menu.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CrearNuevaOrdenModalComponent } from '@modules/ordenes/crear-nueva-orden-modal/crear-nueva-orden-modal.component';

@Component({
    selector: 'app-sistematic-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    standalone: true,
    imports:[
        MatDialogModule,
        SharedModule,
        MatIconModule,
        MenubarModule
    ]
})
export class SistematicMenuComponent {
    private readonly MenuService = inject(MenuService);

      readonly dialog = inject(MatDialog);
    items: MenuItem[] | undefined;

    openDialog(): void {
    const dialogRef = this.dialog.open(CrearNuevaOrdenModalComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        ;
      }
    });
  }

    ngOnInit() {
        this.items = [
            {
                label: 'Solicitudes',
                icon: 'pi pi-fw pi-calculator',
                items: [
                    {
                        label: 'Nueva',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Orden',
                                icon: 'pi pi-fw pi-bookmark',
                                command: () => this.openDialog()
                            }
                            // ,
                            // {
                            //     label: 'otras',
                            //     icon: 'pi pi-fw pi-video'
                            // }
                        ]
                    }
                    // ,
                    // {
                    //     label: 'Delete',
                    //     icon: 'pi pi-fw pi-trash'
                    // },
                    // {
                    //     separator: true
                    // },
                    // {
                    //     label: 'Export',
                    //     icon: 'pi pi-fw pi-external-link'
                    // }
                ]
            },
            // {
            //     label: 'Inventario',
            //     icon: 'pi pi-fw pi-book',
            //     items: [
            //         {
            //             label: 'Left',
            //             icon: 'pi pi-fw pi-align-left'
            //         },
            //         {
            //             label: 'Right',
            //             icon: 'pi pi-fw pi-align-right'
            //         },
            //         {
            //             label: 'Center',
            //             icon: 'pi pi-fw pi-align-center'
            //         },
            //         {
            //             label: 'Justify',
            //             icon: 'pi pi-fw pi-align-justify'
            //         }
            //     ]
            // },
            // {
            //     label: 'Reportes',
            //     icon: 'pi pi-fw pi-file-pdf',
            //     items: [
            //         {
            //             label: 'New',
            //             icon: 'pi pi-fw pi-user-plus'
            //         },
            //         {
            //             label: 'Delete',
            //             icon: 'pi pi-fw pi-user-minus'
            //         },
            //         {
            //             label: 'Search',
            //             icon: 'pi pi-fw pi-users',
            //             items: [
            //                 {
            //                     label: 'Filter',
            //                     icon: 'pi pi-fw pi-filter',
            //                     items: [
            //                         {
            //                             label: 'Print',
            //                             icon: 'pi pi-fw pi-print'
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     icon: 'pi pi-fw pi-bars',
            //                     label: 'List'
            //                 }
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Configuracion',
            //     icon: 'pi pi-fw pi-spin pi-cog',
            //     items: [
            //         {
            //             label: 'Edit',
            //             icon: 'pi pi-fw pi-pencil',
            //             items: [
            //                 {
            //                     label: 'Save',
            //                     icon: 'pi pi-fw pi-calendar-plus'
            //                 },
            //                 {
            //                     label: 'Delete',
            //                     icon: 'pi pi-fw pi-calendar-minus'
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Archieve',
            //             icon: 'pi pi-fw pi-calendar-times',
            //             items: [
            //                 {
            //                     label: 'Remove',
            //                     icon: 'pi pi-fw pi-calendar-minus'
            //                 }
            //             ]
            //         }
            //     ]
            // },
            
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off',
                command: () => this.logOut(),
                
            }
        ];
    }


    logOut(){
        this.MenuService.logOut()
    }
}
