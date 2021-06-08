import { CarouselComponent } from './carousel/carousel.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCarouselModule } from '@ngmodule/material-carousel';

const routes: Routes = [
    {
      path: '',
      children: [
        { path: '', redirectTo: 'carousel' },
        { path: 'carousel', component: CarouselComponent },
      ],
    },
  ];
  
  @NgModule({
    declarations: [CarouselComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MatCarouselModule.forRoot()
    ],
  })
  export class CarouselModule {}
