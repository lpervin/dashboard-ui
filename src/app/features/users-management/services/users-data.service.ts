import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel, UserRequiredProps, UsersApiResponseModel } from '../models/UsersModel';
import { ApiPageRequest } from 'src/app/shared//models/APIs';
import { environment } from 'src/environments/environment';
import { Observable, mergeMap } from 'rxjs';

const BASE_URL =  environment.api_baseurl;
const HEADER = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private http: HttpClient) { }

      list() {
        return this.http.get<UsersApiResponseModel>(BASE_URL);
      }

      page(request: ApiPageRequest){
        return this.http.get<UsersApiResponseModel>(BASE_URL, { params: { ...request} });
      }

      update(id: string, userUpdate: UserRequiredProps){
        return this.http.put<UserModel>(
          `${BASE_URL}/${id}`,
            JSON.stringify(userUpdate),
            HEADER
        );
     }

     create(newUser: UserModel){        
        return this.http.post<UserModel>(
          `${BASE_URL}`,
            JSON.stringify(newUser),
            HEADER
        ).pipe(
          mergeMap((response: UserModel) => this.list())
        );
     }

     delete(id: string){
      return this.http.delete<UserModel>(
        `${BASE_URL}/${id}`,
        HEADER
      );
     }
}