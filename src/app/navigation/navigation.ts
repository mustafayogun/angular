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
                type: 'item',
                url: '/apps/dashboards/project'
            },
            {
                id: 'talep',
                title: 'Talep',
                translate: 'Talep',
                type: 'item',
                url: '/apps/talep'
            },
            {
                id: 'proje',
                title: 'Proje',
                translate: 'Proje',
                type: 'item',
                url: '/apps/proje'
            }
        ]
    }
];
