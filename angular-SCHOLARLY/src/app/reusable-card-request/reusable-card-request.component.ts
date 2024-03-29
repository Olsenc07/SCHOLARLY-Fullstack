import { Component, OnInit } from '@angular/core';
import { StoreService, Profile } from '../services/store.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthDataInfo } from '../signup/auth-data.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
    selector: 'app-card-request',
    templateUrl: './reusable-card-request.component.html',
    styleUrls: ['./reusable-card-request.component.scss'],
})

export class ReusableCardRequestComponent implements OnInit {
    userId: string;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    infos: AuthDataInfo[] = [];
    private infosSub: Subscription;

    isLoading = false;


    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.isLoading = true;
        this.authService.getInfo();
        this.infosSub = this.authService.getInfoUpdateListener()
    .subscribe((infos: AuthDataInfo[]) => {
    this.infos = infos;
    this.isLoading = false;
  });
        this.userId = this.authService.getUserId();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
              this.userIsAuthenticated = isAuthenticated;
              this.userId = this.authService.getUserId();
            });
    }
}



@Component({
    selector: 'app-card-recommendation',
    templateUrl: './reusable-card-recommendation.component.html',
    styleUrls: ['./reusable-card-request.component.scss'],
})
export class ReusableCardRecommendationComponent implements OnInit {
    userId: string;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    infos: AuthDataInfo[] = [];
    private infosSub: Subscription;

    isLoading = false;


    onOtherUser(info): any{
    // this.authService.getOtherInfo();
    this.authService.otherProfiles(info);
    }


    constructor(public storeService: StoreService,
                private authService: AuthService,
                private router: Router,
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.authService.getInfo();
        this.infosSub = this.authService.getInfoUpdateListener()
    .subscribe((infos: AuthDataInfo[]) => {
    this.infos = infos;
    this.isLoading = false;
  });
        this.userId = this.authService.getUserId();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
              this.userIsAuthenticated = isAuthenticated;
              this.userId = this.authService.getUserId();
              // Can add *ngIf="userIsAuthenticated" to hide items
            });
    }
    navigateToPage(value: string): void {
        this.router.navigate(['/profiles'],
        { queryParams: { user: value } });
  
        console.log(window.location.search);
        this.authService.getOtherInfo();

        // console.log(value);
        // this.authService.otherProfiles(value);

      }


    }

