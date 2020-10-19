import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../@core/auth/auth.service';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css'],
})
export class GoogleAuthComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    let token: string = this.route.snapshot.params['token'];
    if (token.charAt(token.length - 1) === '#') {
      token = token.substring(0, token.length - 1);
    }
    if (this.authService.validateToken(token)) {
      this.authService.removeToken();
      this.authService.setToken(token);
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
