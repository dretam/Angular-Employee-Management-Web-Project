import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {
    
  }

  switchPage (path: string) {
    this.router.navigateByUrl(path);
  }

  onSignOut() {
    localStorage.removeItem('token');

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 300);
  }
}
