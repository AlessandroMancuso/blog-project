import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.interface';
import { DataService } from '../services/data.service';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: Post;
  user: User | null = null;
  userInitials?: string;
  showDialog: boolean = false;

  // Layout
  @Input() isPairMode: boolean = false;
  @Input() isDarkMode: boolean = false;

  constructor(private dataService: DataService, private router: Router, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.getUserData();
  }

  getUserData(): void {
    this.dataService
      .getUser(this.post.userId)
      .pipe(
        tap((user: User) => {
          this.user = user;
          this.userInitials = this.getInitials(this.user.name);
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

  getInitials(fullName: string): string {
    const words = fullName.split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join(' ');
  }

  //UTILS
  openDialog(): void {
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  goToProfile(): void {
    if (this.user) {
      sessionStorage.setItem('userId', this.user.id.toString());
      this.router.navigate(['/profile']);
    }
  }
}
