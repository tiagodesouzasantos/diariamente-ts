import { Component, OnInit } from '@angular/core';
import { BatsService } from '../services/bats.service';
import { ServersService } from '../services/servers.service';
import { SystemServerService } from '../services/system-server.service';

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
	textFront = {
		unConfigOption:"(Opção não configurada)",
		development: "Desenvolvimento",
		update: "Atualizar",
		production:"Produção",
		project:"Projeto",
		action:"Ações",
		msg:"Mensagens"
	};

	constructor(
		private _systemServerService: SystemServerService, 
		private _serversService: ServersService){

	}

	ngOnInit() {
		var servers = this._serversService.getServers();
		servers.subscribe((res:any[])=>{
			this.loadingData = false;
			this.listSoftwares = res;
		});
	}  

	updateSoftware(software,environment){
		let post = this._systemServerService.update(software[environment].link_api, software[environment]);
		software.updating = true;
		post.subscribe((result:any[])=>{
			software.updating = false;
			software.msg = result;
			console.log(result);			
		},error=>{
			software.updating = false;
			software.msg = error.error;
			console.error(error);			
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
