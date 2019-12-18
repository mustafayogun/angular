import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {AuthenticationService} from '../security/authentication.service';
import {first} from 'rxjs/operators';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    loading: boolean;
    error:   '';
    returnUrl: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private  _authenticationService: AuthenticationService,
        private  router: Router,
        private  route: ActivatedRoute,
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            username   : ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get f(){

        return this.loginForm.controls;

    }
    // tslint:disable-next-line:typedef
    login(){

        this.loading = true;
        this._authenticationService.loginx(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                _data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;

                    this.loading = false;
                });
    }


}
