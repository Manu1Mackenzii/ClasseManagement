import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spin-loader',
  templateUrl: './spin-loader.component.html',
  styleUrls: ['./spin-loader.component.scss']
})
export class SpinLoaderComponent {

  @Input() loading: boolean = false;
}
