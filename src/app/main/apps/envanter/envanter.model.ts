import { FuseUtils } from '@fuse/utils';

export class Envanter
{
    id: string;
    envAdi: string;
    envKisaKodu: string;
    envKodu: string;
    birim: any [] ;
    birimId: string ;
    tip: any [] ;
    tipId: string ;
    sorumlu: any [] ;
    sorumluId: string ;
    envanterDetayDtos: any [] ;


    /**
     * Constructor
     *
     * @param envanter
     */
    constructor(envanter)
    {
        {
            this.id = envanter.id || FuseUtils.generateGUID();
            this.envAdi = envanter.envAdi || '';
            this.envKisaKodu = envanter.envKisaKodu || '';
            this.envKodu = envanter.envKodu ;
            this.birim = envanter.birim || [];
            this.tip = envanter.tip || [];
            this.sorumlu = envanter.sorumlu || [];
            this.envanterDetayDtos = envanter.envanterDetayDtos || [];


        }
    }
}
export class EnvanterKayitModel
{

    envAdi: string;
    envKisaKodu: string;
    envKodu: string;
    sorumluId: string;
    tipId: string;
    birimId: string;
    durumId: string;


    // tslint:disable-next-line:no-shadowed-variable
    constructor(EnvanterKayitModel)
    {
        {

            this.envAdi = EnvanterKayitModel.envAdi || 0;
            this.envKisaKodu = EnvanterKayitModel.envKisaKodu || 0;
            this.envKodu = EnvanterKayitModel.envKodu || 0;
            this.birimId = EnvanterKayitModel.birim || 0;
            this.tipId = EnvanterKayitModel.tip || 0;
            this.sorumluId = EnvanterKayitModel.sorumlu || 0;



        }
    }

}export class EnvanterUpdateModel
{
    id: string;
    envAdi: string;
    envKisaKodu: string;
    envKodu: string;
    sorumluId: string;
    tipId: string;
    birimId: string;
    durumId: string;


    // tslint:disable-next-line:no-shadowed-variable
    constructor(EnvanterKayitModel)
    {
        {

            this.envAdi = EnvanterKayitModel.envAdi || '';
            this.envKisaKodu = EnvanterKayitModel.envKisaKodu || '';
            this.envKodu = EnvanterKayitModel.envKodu || null;
            this.birimId = EnvanterKayitModel.birim || '';
            this.tipId = EnvanterKayitModel.tip || '';
            this.sorumluId = EnvanterKayitModel.sorumlu || '';



        }
    }

}
export class Envanterr
{
    id: string;
    name: string;
    lastName: string;
    avatar: string;
    nickname: string;
    company: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    notes: string;

    /**
     * Constructor
     *
     * @param envanter
     */
    constructor(envanterr)
    {
        {
            this.id = envanterr.id || FuseUtils.generateGUID();
            this.name = envanterr.name || '';
            this.lastName = envanterr.lastName || '';
            this.avatar = envanterr.avatar || 'assets/images/avatars/profile.jpg';
            this.nickname = envanterr.nickname || '';
            this.company = envanterr.company || '';
            this.jobTitle = envanterr.jobTitle || '';
            this.email = envanterr.email || '';
            this.phone = envanterr.phone || '';
            this.address = envanterr.address || '';
            this.birthday = envanterr.birthday || '';
            this.notes = envanterr.notes || '';
        }
    }
}
