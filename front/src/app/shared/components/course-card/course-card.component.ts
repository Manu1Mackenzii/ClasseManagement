import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input()
  id: string = '';

  @Input()
  title: string =  '';

  @Input()
  description: string =  '';

  @Input()
  coverImageUrl: string =  '';

  @Input()
  duration: Number =  0;

  @Input()
  type: string =  '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isVideo() {
    return this?.type === 'VIDEO';
  }

  goToDetails() {
    this.router.navigate(['tutorials', this.id])
  }
}
