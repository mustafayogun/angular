import {Component, OnInit} from '@angular/core';
import {ProjeService} from '../../../../services/shared/proje.service';


declare var $;

@Component({

    templateUrl: './proje.component.html',
    styleUrls: ['./proje.component.css']
})
export class ProjeComponent implements OnInit {
    message = '';
    dtOptions: DataTables.Settings = {};


    constructor(private  projeService: ProjeService) {

    }

    someClickHandler(info: any): void {
        this.message = info.id + ' - ' + info.firstName;
        alert('lolo');
    }

    ngOnInit(): void {

        this.dtOptions = {
            ajax: {
                url: 'http://localhost:8000/api/proje/pagination?page=0&size=1500',
                dataSrc: 'content'
            },

            columns: [{
                title: 'ID',
                data: 'id'
            }, {
                title: 'First name',
                data: 'projeAdi'
            }, {
                title: 'Last name',
                data: 'projeCode'
            }],
            dom: 'Bfrtip',
            // Configure the buttons

            rowCallback: (row: Node, data: any[] | Object, index: number) => {
                const self = this;
                $('td', row).unbind('click');
                $('td', row).bind('click', () => {
                    self.someClickHandler(data);
                });
                return row;
            }

        };

    }
}
