import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ChordSheetsComponent } from './pages/chord-sheets/chord-sheets.component';
import { TutorialDetailsComponent } from './pages/tutorial-details/tutorial-details.component';
import { TutorialListComponent } from './pages/tutorial-list/tutorial-list.component';
import { TutorialsRoutingModule } from './tutorials-routing.module';


@NgModule({
  declarations: [
    TutorialListComponent,
    TutorialDetailsComponent,
    ChordSheetsComponent
  ],
  imports: [
    CommonModule,
    TutorialsRoutingModule,
    SharedComponentsModule,
    PipesModule
  ]
})
export class TutorialsModule { }
