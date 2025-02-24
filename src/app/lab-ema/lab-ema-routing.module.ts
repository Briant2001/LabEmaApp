import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { CatalogoAcreditadosPageComponent } from './pages/catalogo-acreditados-page/catalogo-acreditados-page.component';
import { OrganismosCertificacionPageComponent } from './pages/organismos-certificacion-page/organismos-certificacion-page.component';
import { UnidadesInspeccionPageComponent } from './pages/unidades-inspeccion-page/unidades-inspeccion-page.component';
import { LaboratoriosCalibracionPageComponent } from './pages/laboratorios-calibracion-page/laboratorios-calibracion-page.component';
import { LaboratoriosEnsayosPageComponent } from './pages/laboratorios-ensayos-page/laboratorios-ensayos-page.component';
import { LabAnalisisClinicosPageComponent } from './pages/lab-analisis-clinicos-page/lab-analisis-clinicos-page.component';
import { ProveedoresEnsayosAptitudPageComponent } from './pages/proveedores-ensayos-aptitud-page/proveedores-ensayos-aptitud-page.component';
import { ProductosMRCPageComponent } from './pages/productos-mrcpage/productos-mrcpage.component';
import { BancosSangrePageComponent } from './pages/bancos-sangre-page/bancos-sangre-page.component';
import { GabRadiologiaImagenPageComponent } from './pages/gab-radiologia-imagen-page/gab-radiologia-imagen-page.component';

const routes: Routes = [
  {
    path:"catalogo",
    component:LayoutPageComponent,
    children:[
      {path:"OC",component:OrganismosCertificacionPageComponent},
      {path:"UI",component:UnidadesInspeccionPageComponent},
      {path:"LC",component:LaboratoriosCalibracionPageComponent},
      {path:"LP",component:LaboratoriosEnsayosPageComponent},
      {path:"SALUD",component:LabAnalisisClinicosPageComponent},
      {path:"PEA",component:ProveedoresEnsayosAptitudPageComponent},
      {path:"PMR",component:ProductosMRCPageComponent},
      {path:"BS",component:BancosSangrePageComponent},
      {path:"RI",component:GabRadiologiaImagenPageComponent},
      {path:"busqueda",component:CatalogoAcreditadosPageComponent},
      {path:"**",redirectTo:"busqueda"},

    ]
  },
  {path:"**",redirectTo:"catalogo"}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabEmaRoutingModule { }
