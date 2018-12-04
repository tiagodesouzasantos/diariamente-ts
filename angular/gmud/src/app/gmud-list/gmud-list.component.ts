import { Component, OnInit } from '@angular/core';
import { BatsService } from '../services/bats.service';
import { ServersService } from '../services/servers.service';
// import { Observable } from 'rxjs/Rx';
@Component({
	selector: 'gmud-list',
	templateUrl: './gmud-list.component.html',
	styleUrls: ['./gmud-list.component.scss']
})
export class GmudListComponent implements OnInit {

	panelOpenState = false;
	step:number = 0;
	listSoftwares = [];

	constructor(
		private _batsService: BatsService, 
		private _serversService: ServersService){

	}

	ngOnInit() {
		var servers = this._serversService.getServers();
		servers.subscribe((res:any[])=>{
			this.listSoftwares = res;
		});
	}  

	updateSoftware(software){
		let post = this._batsService.postBat(software);
		post.subscribe((res:any[])=>{
			console.log(res);
			// adicionar logica loading
		});
	}	

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}
}
