import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"ema",loadChildren: ()=> import("./lab-ema/lab-ema.module").then(m=> m.LabEmaModule)},
  {path:"**",redirectTo:"ema"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
