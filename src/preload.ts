import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyReactComponent = React.ComponentType<any>;
type ReactComponentLazyFactory = () => Promise<{ default: AnyReactComponent }>;
const lazyPreloadQueue: ReactComponentLazyFactory[] = [];

// check https://medium.com/hackernoon/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d
function lazyWithPreload(
  factory: ReactComponentLazyFactory,
): React.LazyExoticComponent<AnyReactComponent> {
  const Component = React.lazy(factory);
  lazyPreloadQueue.push(factory);
  return Component;
}

export function preloadAll() {
  for (const preload of lazyPreloadQueue) {
    void preload();
  }
}

export const ErrorPage = lazyWithPreload(() => import("pages/ErrorFallback"));
export const HomePage = lazyWithPreload(() => import("pages/Home"));
export const FavoritePage = lazyWithPreload(() => import("pages/Favorite"));
export const LocationPage = lazyWithPreload(() => import("pages/Location"));
export const BillsPage = lazyWithPreload(() => import("pages/Bills"));
export const NutritionPage = lazyWithPreload(() => import("pages/Nutrition"));
export const NotFoundPage = lazyWithPreload(() => import("pages/NotFound"));
