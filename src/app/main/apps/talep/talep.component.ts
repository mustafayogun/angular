import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
    konu: string;
    id: number;
    aciklama: number;
    status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { id: 1, konu: 'Hydrogen', aciklama: 1.0079, status: 'H'},
    { id: 1, konu: 'Hydrogen', aciklama: 1.0079, status: 'H'}

];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'talep.component',
    styleUrls: ['talep.component.scss'],
    templateUrl: 'talep.component.html',
})
export class TalepComponent {
    displayedColumns: string[] = ['id', 'konu', 'aciklama', 'status'];
    dataSource = ELEMENT_DATA;
}