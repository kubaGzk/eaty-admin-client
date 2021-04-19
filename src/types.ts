import React from 'react';

export type RouteType = {
  path: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  layout: string;
};
