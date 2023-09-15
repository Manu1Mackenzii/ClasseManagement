import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss']
})
export class TutorialListComponent implements OnInit {

  tutorialList: any[] = [];

  constructor() { }

  ngOnInit(): void {

    this.tutorialList = [
      {
        id: '1',
        title: 'Apprendre les accords majeurs. Titre long juste pour tester',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'VIDEO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'VIDEO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'AUDIO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'VIDEO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'AUDIO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'VIDEO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'VIDEO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'VIDEO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'VIDEO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'VIDEO'
      },
      {
        id: '1',
        title: 'Apprendre les accords majeurs',
        description: 'Ce cours a pour objectif de vous apprendre les accords majeurs et mineurs',
        coverImageUrl: 'https://pianote.s3.amazonaws.com/sales/2022/header-image5.jpg',
        duration: 10,
        type: 'VIDEO'
      },
    ]
  };

}
