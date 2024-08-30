import { CanActivateFn } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { inject } from '@angular/core';



export const titleGuardGuard: CanActivateFn = (route, state) => {
  // Retrieve the title from route data
  // Inject Angular services
const titleService = inject(Title);
  const title = route.data['title'] as string;

  // Set the document title if it exists
  if (title) {
    titleService.setTitle(title);
  }

  // Allow navigation
  return true;
};
