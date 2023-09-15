import { RouterModule, Routes } from "@angular/router";
import { InstrumentListComponent } from "./pages/instrument-list/instrument-list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { 
      path: '',
      component: InstrumentListComponent
    }
  
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InstrumentRoutingModule { }
  