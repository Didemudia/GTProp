import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOfferPage } from './new-offer.page';

const routes: Routes = [
  {
    path: '',
    component: NewOfferPage
  },
  {
    path: 'edit-offer',
    loadChildren: () => import('./edit-offer/edit-offer.module').then( m => m.EditOfferPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOfferPageRoutingModule {}
