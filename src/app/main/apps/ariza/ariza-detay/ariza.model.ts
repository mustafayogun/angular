import { FuseUtils } from '@fuse/utils';

export class Ariza
{
    id: string;
    konu: string;
    aciklama: string;
    status: string;
    islem: any[];
    arizaLogs: any[];
    sorumluBirim: any[];
    arizaSorumluUser: any[];
    sorumluBirimID: string;
    arizaSorumluUserId: string;
    assignee: any[];
    assigneeId: string;
    islems: any[];
    islemID: string;
    arizaLogAciklama: string;
    envanter: any[];
    tarih: string;
    envanterDetayDtos: any [];
    envanterAdi: string;
    envanterArizaGecmisi: any [];
    arizaLogDto: any [];
    durum: any [];
    durumId: string;



    /**
     * Constructor
     *
     * @param order
     */
    constructor(ariza?)
    {
        ariza = ariza || {};
        this.id = ariza.id || FuseUtils.generateGUID();
        this.konu = ariza.konu || 0;
        this.aciklama = ariza.aciklama || 0;
        this.status = ariza.status || 0;
        this.arizaLogs = ariza.arizaLogs || [];
        this.sorumluBirim = ariza.sorumluBirim || [];
        this.arizaSorumluUser = ariza.arizaSorumluUser || [];
        this.assignee = ariza.assignee || [];
        this.islem = ariza.islem || [];
        this.islems = ariza.islems || [];
        this.assigneeId = ariza.assigneeId || 0;
        this.arizaLogAciklama = ariza.arizaLogAciklama || 0;
        this.tarih = ariza.tarih || 0;
        this.envanter = ariza.envanter || [] ;
        this.envanterDetayDtos = ariza.envanterDetayDtos || [];
        this.envanterArizaGecmisi = ariza.envanterArizaGecmisi || 0;
        this.arizaLogDto = this.envanterArizaGecmisi['arizaLogDto'] || 0 ;
        this.durum = ariza.durum || [];

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
