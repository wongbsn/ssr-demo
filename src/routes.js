import React from 'react';

import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Home'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  }
];
