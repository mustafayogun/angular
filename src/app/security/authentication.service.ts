import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private activeUser: Observable<any>;
    private  _key = 'user';
    private value = [];
  constructor(
      private http: HttpClient,
      private _apiService: ApiService,

  )

  {
  }


  loginx (username: string, password: string) {
    return this.http.post<any>( environment.API_BASE_PATH + '/token', {username, password})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }


      }));

  }

  register(registerData) {
    return this.http.post<any>( environment.API_BASE_PATH + '/token/register', registerData)
      .pipe(map(resp => {
        return resp;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }


}
