import { FuseUtils } from '@fuse/utils';

export class Order
{
    id: string;
    konu: string;
    aciklama: string;
    status: string;
    islem: any[];
    arizaLogs: any[];
    sorumluBirim: any[];
    arizaSorumluUser: any[];
    sorumluBirimID : string;
    arizaSorumluUserId : string;
    assignee: any[];
    assigneeId: string;
    islems:any[];
    islemID : string;
    arizaLogAciklama : string;
    envanter: any[];
    tarih: string;
    envanterDetayDtos: any [];
    envanterAdi: string;
    envanterArizaGecmisi:any [];
    arizaLogDto: any [];
    durum: any [];
    durumId: string;



    /**
     * Constructor
     *
     * @param order
     */
    constructor(order?)
    {
        order = order || {};
        this.id = order.id || FuseUtils.generateGUID();
        this.konu = order.konu || 0;
        this.aciklama = order.aciklama || 0;
        this.status = order.status || 0;
        this.arizaLogs = order.arizaLogs || [];
        this.sorumluBirim = order.sorumluBirim || [];
        this.arizaSorumluUser = order.arizaSorumluUser || [];
        this.assignee = order.assignee || [];
        this.islem = order.islem || [];
        this.islems = order.islems || [];
        this.assigneeId = order.assigneeId || 0;
        this.arizaLogAciklama = order.arizaLogAciklama || 0;
        this.tarih = order.tarih || 0;
        this.envanter = order.envanter || [] ;
        this.envanterDetayDtos = order.envanterDetayDtos || [];
        this.envanterArizaGecmisi = order.envanterArizaGecmisi || 0;
        this.arizaLogDto = this.envanterArizaGecmisi['arizaLogDto'] || 0 ;
        this.durum = order.durum || [];

    }



}
export class ArizaLog
{

    arizaId: string;
    aciklama: string;
    assigneeId: string;
    islemId: string;

    /**
     * Constructor
     *
     * @param order
     */
    constructor(alog?) {
        alog = alog || {};
        this.aciklama = alog.aciklama || 0;
        this.arizaId = alog.arizaId || 0;
        this.assigneeId = alog.assigneeId || 0;
        this.islemId = alog.islemId || 0;


    }


}

export class ArizaKaydet
{

    konu: string;
    aciklama: string;
    assigneeId: string;
    islemId: string;
    sorumluBirimId: string;
    envanterId: string;
    durumId: string;


    /**
     * Constructor
     *
     * @param order
     */
    constructor(ariza?) {
        ariza = ariza || {};
        this.konu = ariza.konu || 0;
        this.aciklama = ariza.aciklama || 0;
        this.assigneeId = ariza.assigneeId || 0;
        this.islemId = ariza.islemId || 0;
        this.sorumluBirimId = ariza.sorumluBirimId || 0 ;
        this.envanterId = ariza.envanterId || 0 ;
        this.durumId = ariza.durumId || 0;



    }


}
