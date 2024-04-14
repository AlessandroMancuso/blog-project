import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { User } from '../../models/user.interface';
import { catchError, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  userId!: number;
  user: User | null = null;

  ngOnInit() {
    const userIdString = sessionStorage.getItem('userId');

    if (userIdString) {
      this.userId = parseInt(userIdString);
      this.spinner.show();
      this.getUserData();
    }
  }

  getUserData(): void {
    this.dataService
      .getUser(this.userId)
      .pipe(
        tap((user: User) => {
          this.user = user;
          this.spinner.hide();
        }),
        catchError((error) => {
          console.error('Error fetching user data:', error);
          this.spinner.hide();
          return of(null);
        })
      )
      .subscribe();
  }
}
