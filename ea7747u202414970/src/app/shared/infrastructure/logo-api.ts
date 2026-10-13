import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseApi} from './base-api';


/**
 * API facade for the Logo.dev Logo API.
 *
 * @remarks
 * Logo.dev serves logos as images, so this service only builds the image URL
 * from the environment configuration instead of performing HTTP requests.
 *
 * @author Carla Gallardo
 */
@Injectable({providedIn: 'root'})
export class LogoApi extends BaseApi {
  /**
   * Base URL of the logo provider.
   */
  private readonly baseUrl = environment.logoProviderApiBaseUrl;

  /**
   * Publishable key used to authenticate against the logo provider.
   */
  private readonly publishableKey = environment.logoProviderPublishableKey;

  /**
   * Builds the URL of the logo that belongs to a website domain.
   *
   * @param domain - The website domain of the organization (e.g., 'home.cern').
   * @returns The URL of the logo image.
   */
  getUrlFor(domain: string): string {
    return `${this.baseUrl}${domain}?token=${this.publishableKey}`;
  }
}
