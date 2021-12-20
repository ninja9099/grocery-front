import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('../modules/auth/auth.module').then(
            (m) => m.AuthModule,
          ),
      },
    ],
  }
];
