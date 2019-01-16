import { Component, OnInit } from '@angular/core';
import { BatsService } from '../services/bats.service';
import { ServersService } from '../services/servers.service';

@Component({
	selector: 'gmud-list',
	templateUrl: './gmud-list.component.html',
	styleUrls: ['./gmud-list.component.scss']
})
export class GmudListComponent implements OnInit {
	loadingData = true;
	panelOpenState = false;
	step:number = 0;
	listSoftwares = [];
	spinner = { "color": 'primary', "mode": 'indeterminate' };

	constructor(
		private _batsService: BatsService, 
		private _serversService: ServersService){

	}

	ngOnInit() {
		var servers = this._serversService.getServers();
		servers.subscribe((res:any[])=>{
			this.loadingData = false;
			this.listSoftwares = res;
		});
	}  

	updateSoftware(software){
		let post = this._batsService.postBat(software);
		software.updating = true;
		post.subscribe((result:any[])=>{
			software.updating = false;
			software.msg = result;
			console.log(result);			
		},error=>{
			software.updating = false;
			software.msg = error.error;
			console.log(error);			
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
