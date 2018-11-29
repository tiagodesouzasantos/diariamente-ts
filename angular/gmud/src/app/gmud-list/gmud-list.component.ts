import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'app-gmud-list',
	templateUrl: './gmud-list.component.html',
	styleUrls: ['./gmud-list.component.scss']
})
export class GmudListComponent implements OnInit {
	listSoftwares = [
	{nmSoft:"kpi",server:"trancoso"},
	{nmSoft:"microLedFatura",server:"paradise"},
		{ nmSoft: "microLedOperador", server:"paradise"},
		{ nmSoft: "microLedRedex", server:"paradise"},	
		{ nmSoft: "microLedWMS", server:"paradise"}
	]

	constructor() { }

	ngOnInit() {
	}  
	updateSoftware(software){
		console.log('software',software);
	}
}
