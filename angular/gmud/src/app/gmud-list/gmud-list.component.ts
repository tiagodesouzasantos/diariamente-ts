import { Component, OnInit } from '@angular/core';
import { BatsService } from '../bats.service';
// import { Observable } from 'rxjs/Rx';
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

	constructor(private _batsService: BatsService){

	}

	ngOnInit() {
	}  

	updateSoftware(software){
		let post = this._batsService.postBat(software);
		post.subscribe((res:any[])=>{
			console.log(res);
			// this.batRuned = res;
		});
	}
}
