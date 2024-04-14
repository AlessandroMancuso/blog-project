import { Component } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

// INTERFACES
import { Post } from '../../models/post.interface';
import { User } from '../../models/user.interface';

// SERVICES
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  postList: Post[] = [];
  filteredPostList: Post[] = [];

  // Cambio Layout
  isPairMode : boolean = false;
  isDarkMode : boolean = false;

  selectedOption: number = 0;
  options: { value: number, label: string }[] = [];

  ngOnInit(): void {
    this.spinner.show();
    this.getPosts();

    this.initializeFilters();
  }

  getPosts(): void {
    this.dataService
      .getFeed()
      .pipe(
        tap((data: Post[]) => {
          this.postList = data;
          this.filteredPostList = this.postList;
        }),
        catchError((error) => {
          console.error('Error fetching feed data:', error);
          this.spinner.hide();
          return of(null);
        })
      )
      .subscribe();
  }

  initializeFilters() : void {
    this.dataService
      .getUsers()
      .pipe(
        tap((users: User[]) => {
          this.options = users.map((user: User) => ({ value: user.id, label: user.name }));
          this.options.unshift({ value: 0, label: "ALL" })
        }),
        catchError((error) => {
          console.error('Error fetching feed data:', error);
          this.spinner.hide();
          return of(null);
        })
      )
      .subscribe();
  }

  filterPostList(userId : number) : void {
    this.selectedOption = userId;
    this.filteredPostList = userId == 0 ? this.postList : this.postList.filter(post => post.userId == userId);
  }

}
