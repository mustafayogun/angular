import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserModule } from '@angular/platform-browser';
const routes = [
    {path: '', pathMatch: 'full', redirectTo: 'apps/dashboards'},
    {
        path        : 'talep',
        loadChildren: './talep/talep.module#TalepModule'
    },  {
        path        : 'proje',
        loadChildren: './proje/proje.module#ProjeModule'
    },
    {
        path        : 'envanter',
        loadChildren: './envanter/envanter.module#EnvanterModule'
    },
    {
        path        : 'ariza',
        loadChildren: './ariza/ariza.module#ArizaModule'
    },
    {
        path        : 'dashboards',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    },
    {
        path        : 'dashboard/v1.0',
        loadChildren: './dashboard/v1.0/project.module#ProjectDashboardModule'
    },
    {
        path        : 'mail',
        loadChildren: './mail/mail.module#MailModule'
    },
    {
        path        : 'mail-ngrx',
        loadChildren: './mail-ngrx/mail.module#MailNgrxModule'
    },
    {
        path        : 'chat',
        loadChildren: './chat/chat.module#ChatModule'
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    },
    {
        path        : 'e-commerce',
        loadChildren: './e-commerce/e-commerce.module#EcommerceModule'
    },
    {
        path        : 'academy',
        loadChildren: './academy/academy.module#AcademyModule'
    },
    {
        path        : 'todo',
        loadChildren: './todo/todo.module#TodoModule'
    },
    {
        path        : 'file-manager',
        loadChildren: './file-manager/file-manager.module#FileManagerModule'
    },
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#ContactsModule'
    },
    {
        path        : 'scrumboard',
        loadChildren: './scrumboard/scrumboard.module#ScrumboardModule'
    },

];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        DataTablesModule
    ]
})
export class AppsModule
{
}
