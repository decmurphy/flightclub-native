import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './result.routes';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
