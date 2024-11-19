import { CanActivateFn } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

export const titleGuardGuard: CanActivateFn = (route, state) => {
  // Inject Angular services
  const titleService = inject(Title);
  const metaService = inject(Meta);

  // Retrieve the title from route data
  const title = route.data['title'] as string;

  // Set the document title if it exists
  if (title) {
    titleService.setTitle(title);
  }

  // Set or update the canonical URL
  const canonicalUrl = `${environment.canonicalUrl+state.url}`;
  const existingLink: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");

  if (existingLink) {
    // Update the href if the canonical link already exists
    existingLink.setAttribute('href', canonicalUrl);
  } else {
    // Otherwise, create and append a new canonical link tag
    const link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalUrl);
    document.head.appendChild(link);
  }

  // Allow navigation
  return true;
};
