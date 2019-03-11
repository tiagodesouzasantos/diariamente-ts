import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlsService } from './urls.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})

export class ServersService {
	baseUrl: string = "";
	constructor(private http: HttpClient, private __urlsService: UrlsService) { 
		this.baseUrl = __urlsService.getBaseUrl();
	}

	getServers() {
		return this.http.get(this.baseUrl+'api/servers',httpOptions);
	}
}
