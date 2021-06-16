import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthTabsComponent } from 'src/app/components/auth-tabs/auth-tabs.component';
import { LoginComponent } from 'src/app/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthTabsComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
