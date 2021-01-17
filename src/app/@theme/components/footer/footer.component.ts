import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    
    <div class="socials">
    <a href="https://www.facebook.com/adminfrp" target="_blank" class="ion ion-social-facebook"></a>
    <a href="https://www.linkedin.com/company/freelance-provider/" target="_blank" class="ion ion-social-linkedin"></a>
      <a href="https://github.com/" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
