import { Component, ElementRef, OnInit } from '@angular/core';
import * as M from 'materialize-css';
@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const domElement = this.elementRef.nativeElement.querySelector('.tabs');
    M.Tabs.init(domElement , {});

  }

}
