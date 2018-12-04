import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root'})

export class BatsService {
	baseUrl: string = "http://localhost:3000";
	constructor(private http:HttpClient) {}

	postBat(bat){
		return this.http.post(this.baseUrl + '/bats', bat, httpOptions); 
	}
}
