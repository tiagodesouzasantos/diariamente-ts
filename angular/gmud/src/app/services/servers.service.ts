import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})

export class ServersService {
	baseUrl: string = "http://localhost:3000";
	constructor(private http: HttpClient) { }

	getServers() {
		return this.http.get(this.baseUrl + '/servers',httpOptions);
	}
}
