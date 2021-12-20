import { Routes } from '@angular/router';
import {AuthGuard} from "../core/guards/auth.guard";


export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/grocery/grocery.module').then(
            (m) => m.GroceryModule,
          ),
      },
    ],
  },
];

