import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRippleModule, MatSelectModule, MatSnackBar, MatSnackBarModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { EnvanterComponent } from 'app/main/apps/envanter/envanter.component';
import { EnvanterService } from 'app/main/apps/envanter/envanter.service';
import { EnvanterListComponent } from 'app/main/apps/envanter/envanter-list/envanter-list.component';
import { EnvanterSelectedBarComponent } from 'app/main/apps/envanter/selected-bar/selected-bar.component';
import { EnvanterMainSidebarComponent } from 'app/main/apps/envanter/sidebars/main/main.component';
import { EnvanterFormDialogComponent} from 'app/main/apps/envanter/envanter-form/envanter-form.component';

const routes: Routes = [
    {
        path     : '**',
        component: EnvanterComponent,
        resolve  : {
            envanter: EnvanterService
        }
    }
];

@NgModule({
    declarations   : [
        EnvanterComponent,
        EnvanterListComponent,
        EnvanterSelectedBarComponent,
        EnvanterMainSidebarComponent,
        EnvanterFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatSnackBarModule,
    ],
    providers      : [
        EnvanterService
    ],
    entryComponents: [
        EnvanterFormDialogComponent
    ]
})
export class EnvanterModule
{
}
