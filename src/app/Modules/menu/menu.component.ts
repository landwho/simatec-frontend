import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedModule } from '@shared/sharedModule.module';
import { MatIconModule } from '@angular/material/icon';
import { MenubarModule } from 'primeng/menubar';
import { MenuService } from './menu.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrearNuevaOrdenModalComponent } from '@modules/ordenes/crear-nueva-orden-modal/crear-nueva-orden-modal.component';
import { TranslateService } from '@core/services/translate.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sistematic-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    standalone: true,
    imports: [
        MatDialogModule,
        SharedModule,
        MatIconModule,
        MenubarModule,
    ]
})
export class SistematicMenuComponent implements OnInit, OnDestroy {
    private readonly menuService = inject(MenuService);
    private readonly translocoService = inject(TranslateService);
    private langSub!: Subscription;

    readonly dialog = inject(MatDialog);
    items: MenuItem[] | undefined;

    openDialog(): void {
        const dialogRef = this.dialog.open(CrearNuevaOrdenModalComponent, {
            width: '95vw',
            maxWidth: '95vw',
            panelClass: 'full-screen-modal',
            data: {},
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {}
        });
    }

    private buildMenu(): void {
        const t = (key: string) => this.translocoService.translate(`menu.${key}`);
        this.items = [
            {
                label: t('requests'),
                icon: 'pi pi-fw pi-calculator',
                items: [
                    {
                        label: t('new'),
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: t('order'),
                                icon: 'pi pi-fw pi-bookmark',
                                command: () => this.openDialog()
                            }
                        ]
                    }
                ]
            },
            {
                label: t('quit'),
                icon: 'pi pi-fw pi-power-off',
                command: () => this.logOut(),
            }
        ];
    }

    ngOnInit(): void {
        // selectTranslateObject espera la carga del JSON antes del primer emit
        // y re-emite automáticamente cuando cambia el idioma
        this.langSub = this.translocoService
            .selectTranslateObject('menu')
            .subscribe(() => this.buildMenu());
    }

    ngOnDestroy(): void {
        this.langSub?.unsubscribe();
    }

    logOut(): void {
        this.menuService.logOut();
    }
}
