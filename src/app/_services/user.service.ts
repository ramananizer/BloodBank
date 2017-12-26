import { Injectable } from '@angular/core';
//import { HttpClient} from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { User, Requirement } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {

        var bearerHeader ='bearerHeader'.concat(' ').concat(localStorage.getItem('currentUser'));
        
        //let headers = new Headers({ 'authorization': bearerHeader });
        const headers = new HttpHeaders({'authorization': bearerHeader});
        //let options = new RequestOptions({headers : headers});
        return this.http.post('/api/users', user ,{headers : headers});
    }

    createRequirement(requirement : Requirement) : Observable<any>
    {
        var bearerHeader ='bearerHeader'.concat(' ').concat(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({'authorization': bearerHeader});
        return this.http.post('/api/requirement',requirement,{headers : headers});
    }

    fetchMyrequirements(isPublic : boolean)
    {
        var bearerHeader ='bearerHeader'.concat(' ').concat(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({'authorization': bearerHeader});
        return this.http.get('/api/myRequirements/'+isPublic,{headers : headers});
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}