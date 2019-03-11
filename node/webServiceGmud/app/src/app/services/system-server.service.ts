import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SystemServerService {

  constructor(private http: HttpClient) { }
  
  update(_api,data){
    return this.http.post(_api, data, httpOptions); 
  }

}
