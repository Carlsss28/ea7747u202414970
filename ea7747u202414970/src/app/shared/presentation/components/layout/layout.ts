import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {environment} from '../../../../../environments/environment';
import {LogoApi} from '../../../infrastructure/logo-api';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {FooterContent} from '../footer-content/footer-content';

/**
 * Main shell component that hosts the toolbar, the routed content and the footer.
 *
 * @remarks
 * The toolbar shows the organization logo and name on the left, the navigation
 * options at the center and the language switcher on the right.
 *
 * @author Carla Gallardo
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    RouterLinkActive,
    TranslatePipe,
    LanguageSwitcher,
    FooterContent
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  /**
   * Array of navigation options for the application's menu.
   */
  options = signal([
    {link: '/home', label: 'option.home'},
    {link: '/research/items/new', label: 'option.new-research-item'}
  ]);
}
