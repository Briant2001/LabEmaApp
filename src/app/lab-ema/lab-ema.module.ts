import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabEmaRoutingModule } from './lab-ema-routing.module';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { provideHttpClient } from '@angular/common/http';
import { ListLaboratoriosComponent } from './components/list-laboratorios/list-laboratorios.component';
import { CatalogoAcreditadosPageComponent } from './pages/catalogo-acreditados-page/catalogo-acreditados-page.component';
import { OrganismosCertificacionPageComponent } from './pages/organismos-certificacion-page/organismos-certificacion-page.component';
import { UnidadesInspeccionPageComponent } from './pages/unidades-inspeccion-page/unidades-inspeccion-page.component';
import { LaboratoriosCalibracionPageComponent } from './pages/laboratorios-calibracion-page/laboratorios-calibracion-page.component';
import { LaboratoriosEnsayosPageComponent } from './pages/laboratorios-ensayos-page/laboratorios-ensayos-page.component';
import { LabAnalisisClinicosPageComponent } from './pages/lab-analisis-clinicos-page/lab-analisis-clinicos-page.component';
import { ProveedoresEnsayosAptitudPageComponent } from './pages/proveedores-ensayos-aptitud-page/proveedores-ensayos-aptitud-page.component';
import { ProductosMRCPageComponent } from './pages/productos-mrcpage/productos-mrcpage.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { InputBusquedaComponent } from './components/input-busqueda/input-busqueda.component';
import { DescripcionLabComponent } from './components/descripcion-lab/descripcion-lab.component';
import { BancosSangrePageComponent } from './pages/bancos-sangre-page/bancos-sangre-page.component';
import { GabRadiologiaImagenPageComponent } from './pages/gab-radiologia-imagen-page/gab-radiologia-imagen-page.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListLaboratoriosComponent,
    CatalogoAcreditadosPageComponent,
    OrganismosCertificacionPageComponent,
    UnidadesInspeccionPageComponent,
    LaboratoriosCalibracionPageComponent,
    LaboratoriosEnsayosPageComponent,
    LabAnalisisClinicosPageComponent,
    ProveedoresEnsayosAptitudPageComponent,
    ProductosMRCPageComponent,
    LoadingSpinnerComponent,
    PaginacionComponent,
    InputBusquedaComponent,
    DescripcionLabComponent,
    BancosSangrePageComponent,
    GabRadiologiaImagenPageComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    LabEmaRoutingModule
  ],
  providers:[      provideHttpClient(),
  ]
})
export class LabEmaModule { }
