import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProfileUser, SuggestionUser } from '../../../profile/upload-photo-response.interface';

@Component({
  selector: 'app-side-right',
  imports: [RouterLink],
  templateUrl: './side-right.component.html',
  styleUrl: './side-right.component.css',
})
export class SideRightComponent {

  @Input() profileData: ProfileUser | null = null;

  @Input() profilePhoto: string = '/iamges/logo-3.jpeg';

  @Input() suggestions: SuggestionUser[] = [];

}