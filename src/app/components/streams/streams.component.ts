import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {
token : any;
  constructor(private tokenService: TokenService,private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
  }

}
