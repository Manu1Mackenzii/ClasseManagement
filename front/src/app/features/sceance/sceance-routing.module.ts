import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SceanceComponent } from "./pages/sceance-list/sceance.component";

const routes: Routes = [
    { 
      path: '',
      component: SceanceComponent
    }
  
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SceanceRoutingModule { }
  