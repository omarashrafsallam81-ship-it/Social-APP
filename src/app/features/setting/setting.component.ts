import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeService } from './../../service-dark/service/theme.service';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-setting',
  imports: [RouterLink],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  private readonly authService = inject(AuthService);

  readonly themeService = inject(ThemeService);

  logOut(): void {
    this.authService.seignOut();
  }
}
