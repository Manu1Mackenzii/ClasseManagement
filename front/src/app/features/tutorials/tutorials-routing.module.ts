import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialListComponent } from './pages/tutorial-list/tutorial-list.component';
import { ChordSheetsComponent } from './pages/chord-sheets/chord-sheets.component';
import { TutorialDetailsComponent } from './pages/tutorial-details/tutorial-details.component';


const routes = [
  {
    path: '',
    component: TutorialListComponent
  },
  {
    path: 'chord-sheets',
    component: ChordSheetsComponent
  },
  {
    path: ':id',
    component: TutorialDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorialsRoutingModule { }
