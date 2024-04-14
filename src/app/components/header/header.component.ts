import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  
  title = 'BLOG PROJECT';

  // Mock ID dell'utente loggato
  MOCK_USER_ID = '10';

  goToHome() : void {
    this.router.navigate(['']);
  }

  goToProfile() : void {
    sessionStorage.setItem('userId', this.MOCK_USER_ID);
    this.router.navigate(['/profile']);
  }
}
