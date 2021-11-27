import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OnInit } from '@angular/core';
import { AttendanceComponent } from '../main-pages/main-pages.component';
import { TaggedComponent } from '../main-pages/main-pages.component';
import { StoreService } from '../services/store.service';
import { Post, PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-card',
    templateUrl: './reusable-card.component.html',
    styleUrls: ['./reusable-card.component.scss'],
})
export class ReusableCardComponent implements OnInit {
    posts: Post[] = [];
    private postsSub: Subscription;


    post = PostService.post$$;
    profile = StoreService.profile$$;
    id = StoreService.userId$$;


    // gender$ = PostService.gender$;
    // booleans$ = PostService.booleans$;
    // event$ = PostService.event$;

    selectedAttend = '';
    attendances: any = [
        'Attending', 'Maybe', 'Not Attending'
    ];
    panelOpenState = false;
    showCases = [
        // '../../assets/Pics/IMG-8413.PNG',
        // '../../assets/Pics/IMG-8619.PNG',
        '../../assets/Pics/WhiteSquareInAppLogo.jpg',
        // '../../assets/Pics/IMG-8413.PNG', 
        // '../../assets/Pics/IMG-8619.PNG',
        // '../../assets/Pics/ProperInAppLogo.jpeg ',
        // '../../assets/Pics/IMG-8413.PNG'
    ];

    radioChange(event: any): any {
        this.selectedAttend = event.target.value;
    }

    openAttendanceSheet(): void {
        this.bottomSheet.open(AttendanceComponent);
    }
    openTaggedSheet(): void {
        this.bottomSheet.open(TaggedComponent);
    }

    constructor(private bottomSheet: MatBottomSheet,
                public postService: PostService) { }

    ngOnInit(): void {
        this.postService.getPosts();
        this.postsSub = this.postService.getPostUpdateListener()
          .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
      }
}

