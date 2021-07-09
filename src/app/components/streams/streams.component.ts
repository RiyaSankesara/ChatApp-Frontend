import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {
token : any;
streamTab = false;
topstreamTab = false;
  constructor(private tokenService: TokenService,private router: Router) { }

  ngOnInit(): void {
    this.streamTab = true;
    this.token = this.tokenService.GetPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }
  changeTabs(value){
   if(value === 'streams')
   {
     this.streamTab = true;
     this.topstreamTab = false;
   }
   if(value === 'top')
   {
     this.streamTab = false;
     this.topstreamTab = true;
   }
  }

}
