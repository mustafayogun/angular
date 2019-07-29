import {AfterViewInit, Component, OnInit, Renderer} from '@angular/core';
import {ProjeService} from '../../../../services/shared/proje.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-proje',
    templateUrl: './proje.component.html',
    styleUrls: ['./proje.component.css']
})
export class ProjeComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};
    projeMesaj = 'Proje Mesaj';
    dtTrigger: any;


    constructor(private  projeService: ProjeService, private renderer: Renderer, private router: Router) {

    }


    ngOnInit(): void {
        this.dtOptions = {
            ajax: 'http://localhost:8000/api/proje/2',
            columns: [{
                title: 'ID',
                data: 'id'
            }, {
                title: 'First name',
                data: 'projeAdi'
            }, {
                title: 'Last name',
                data: 'ProjeCode'
            }, {
                title: 'Action',
                render: function (data: any, type: any, full: any) {
                    return 'View';
                }
            }]
        };
    }

    ngAfterViewInit(): void {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('view-person-id')) {
                this.router.navigate(['/person/' + event.target.getAttribute('view-person-id')]);
            }
        });
    }

}
