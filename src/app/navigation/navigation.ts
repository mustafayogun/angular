import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'Talep Yonetim Sistemi',
        type: 'group',
        icon: 'apps',
        children: [

            {
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'AnaSayfa',
                icon : 'dashboard',
                type: 'item',
                url: '/apps/dashboards/project'
            },
            {
                id: 'ariza',
                title: 'Ariza',
                translate: 'Ariza',
                type: 'collapsable',
                icon : 'build',
                children: [

                    {
                        id: 'arizaListesi',
                        title: 'Ariza Liste',
                        translate: 'Ariza Liste',
                        type: 'item',
                        url: 'apps/ariza/ariza-liste'
                    }
                ]
            },
            {
                id: 'envanter',
                title: 'Envanter',
                translate: 'Envanter',
                type: 'collapsable',
                icon : 'import_contacts',
                children: [

                    {
                        id: 'envanter Liste',
                        title: 'Envanter Liste',
                        translate: 'Envanter Liste',
                        type: 'item',
                        url: '/apps/envanter'
                    }
                ]
             },
            // {
            //     id: 'talep',
            //     title: 'Talep',
            //     translate: 'Talep',
            //     type: 'item',
            //     url: '/apps/talep'
            // },
            // {
            //     id: 'proje',
            //     title: 'Proje',
            //     translate: 'Proje',
            //     type: 'item',
            //     url: '/apps/proje'
            // },
            // {
            //     id: 'Cliproje',
            //     title: 'CliProje',
            //     translate: 'CliProje',
            //     type: 'item',
            //     url: 'apps/e-commerce/products'
            // },
            // {
            //     id: 'arizaIslem',
            //     title: 'Ariza İşlemleri',
            //     translate: 'CliProj',
            //     type: 'item',
            //     url: 'apps/e-commerce/ariza-liste'
            // },
            // {
            //     id: 'Anasayfa2',
            //     title: 'Anasayfa2',
            //     translate: 'Anasayfa',
            //     type: 'item',
            //     url: 'apps/dashboard/v1.0'
            // }
        ]
    }
];
