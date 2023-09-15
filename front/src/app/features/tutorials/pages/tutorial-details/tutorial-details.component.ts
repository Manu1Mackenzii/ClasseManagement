import { Component, OnInit } from '@angular/core';


type NavOptions = {
  menuDescription: string,
  menuResources: string,
  menuEvaluation: string,
  menuComments: string,
}

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss']
})
export class TutorialDetailsComponent implements OnInit {

  course: any = null;
  comments: any[] = [];

  stepsCount: number = 0;
  completedSteps: number = 0;
  uncompletedSteps: number = 0;
  totalCompletion: number = 0;

  currentChapter: any = null;

  navbarSwitchOptions: NavOptions = {
    menuDescription: 'MENU_DESCRIPTION',
    menuResources: 'MENU_RESOURCES',
    menuEvaluation: 'MENU_QUIZ',
    menuComments: 'MENU_COMMENTS',
  };
  navSwitchExpression: string;

  constructor() {
    this.navSwitchExpression = this.navbarSwitchOptions.menuDescription;
  }

  ngOnInit(): void {
    this.course = {
      id: '',
      title: 'Tutoriel piano, Jouer Facile et efficace',
      category: 'Tutoriel piano, Facile',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus distinctio earum dignissimos quaerat cumque, voluptate illo consectetur, minus delectus, ipsa recusandae? Ullam necessitatibus esse deleniti provident ab tempore quaerat quia?<br><br>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus distinctio earum dignissimos quaerat cumque, voluptate illo consectetur, minus delectus, ipsa recusandae? Ullam necessitatibus esse deleniti provident ab tempore quaerat quia?<br><br>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus distinctio earum dignissimos quaerat cumque, voluptate illo consectetur, minus delectus, ipsa recusandae? Ullam necessitatibus esse deleniti provident ab tempore quaerat quia?<br>",
      video: {
        url: 'https://player.vimeo.com/video/76979871?h=8272103f6e',
        duration: '10'
      },
      instructor: {
        name: 'Natalie Storm',
        title: 'Professeur de chant',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam laboriosam placeat distinctio exercitationem voluptatum eum doloribus illo sed. Sequi in facere placeat reiciendis minima soluta amet consequuntur at, maxime reprehenderit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        photoUrl: 'https://xsgames.co/randomusers/avatar.php?g=male'
      },
      resources: [
        {
          name: 'Grille d\'accord',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          type: 'PDF'
        }
      ],
      chapters: [
        {
          id: 1,
          title: 'Comprendre les accords (niveau facile)',
          locked: false,
          completion: 100
        },
        {
          id: 2,
          title: 'Motion in UI Design',
          locked: false,
          completion: 90
        },
        {
          id: 3,
          title: 'Les renversements d\'accords',
          locked: false,
          completion: 50
        },
        {
          id: 4,
          title: 'Les arpèges 4 temps',
          locked: false,
          completion: 0
        },
        {
          id: 5,
          title: 'Finding inspiration',
          locked: true,
          completion: 0
        },
        {
          id: 6,
          title: 'Les arpèges',
          locked: true,
          completion: 0
        }
      ]
    };

    this.comments = [
      {
        author: {
          name: 'Cédric MAKI',
          photoUrl: 'xsgames.co/randomusers/avatar.php?g=male'
        },
        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam laboriosam placeat distinctio exercitationem voluptatum eum doloribus illo sed. Sequi in facere placeat reiciendis minima soluta amet consequuntur at, maxime reprehenderit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        date: '10-06-2022'
      },
      {
        author: {
          name: 'Mady Amir',
          photoUrl: 'xsgames.co/randomusers/avatar.php?g=male'
        },
        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam laboriosam placeat distinctio exercitationem voluptatum eum doloribus illo sed. Sequi in facere placeat reiciendis minima soluta amet consequuntur at, maxime reprehenderit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        date: '10-06-2022'
      },
      {
        author: {
          name: 'Emmanuel Couire',
          photoUrl: 'xsgames.co/randomusers/avatar.php?g=male'
        },
        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam laboriosam placeat distinctio exercitationem voluptatum eum doloribus illo sed. Sequi in facere placeat reiciendis minima soluta amet consequuntur at, maxime reprehenderit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        date: '10-06-2022'
      }
    ]

    // Set completion steps
    this.setStepsCompletion();
    this.currentChapter = this.getCurrentChapter();
  }

  /**
   * Get steps completions
   */
  setStepsCompletion() {
    this.course.chapters.forEach((chapter: any) => {
      if (chapter.completion == 100) {
        this.completedSteps++;
      } else {
        this.uncompletedSteps++;
      }
    });

    this.stepsCount = this.course.chapters.length;
    this.totalCompletion = (this.completedSteps * 100) / this.stepsCount;
  }

  /**
   * Select chapter
   */
  selectChapter(chapter: any) {
    if (!chapter.locked) {
      this.currentChapter = chapter
    }
  }

  isSelectedChapter(chapter: any) {
    return this.currentChapter && this.currentChapter.id == chapter.id;
  }

  /**
   * 
   * @returns 
   */
  getCurrentChapter() {
    for(let chapter of this.course.chapters) {
      if (chapter.completion < 100) {
        return chapter;
      }
    }
    return this.course.chapters[0];
  }

  /**
   * Change menu
   */
  changeMenu(menuOption: string) {
    this.navSwitchExpression = menuOption;
  }

  isMenuSelected(menuOption: string) {
    return this.navSwitchExpression == menuOption;
  }
}
