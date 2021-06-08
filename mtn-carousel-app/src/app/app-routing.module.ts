import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from '../app/carousel/carousel.component'

const routes: Routes = [
  {
  path: '',
  component: CarouselComponent,
   },

  {
    path: 'auth',
    loadChildren: () => import('./carousel.module').then((m) => m.CarouselModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
