import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailResolverService } from './email-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // Children routes are tied to the specific component being rendered
    // on the given path. We can access these components being rendered
    // on these child routes by placing the router-outlet within
    // the component.
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      // If Im at any route with /inbox/[anything] this component
      // will be rendered
      {
        path: ':id',
        component: EmailShowComponent,
        // Before the route is activated and the email component is
        // rendered we are going to fetch some data with key as email
        // and the source of that data is going to be through our
        // EmailResolverService.

        // NOTE: The component is not going to render until the all
        // resolvers have resolved with the data.
        resolve: {
          email: EmailResolverService.resolve,
        },
      },
      { path: '', component: PlaceholderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
