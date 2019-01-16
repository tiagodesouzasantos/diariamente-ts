import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UrlsService {
	baseUrl: string = "";
	location = window.location;
	constructor() { }
	getBaseUrl(){
		this.baseUrl = "";
		if (this.location.hostname =="localhost"){
			this.baseUrl = this.location.protocol + "//" + 'trancoso' + ":3000";
			// this.baseUrl = this.location.protocol + "//" + this.location.hostname + ":3000";
		}
		return this.baseUrl;
	}
}
