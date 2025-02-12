/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ArticlesTitleImport } from './routes/articles/$title'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ArticlesTitleRoute = ArticlesTitleImport.update({
  id: '/articles/$title',
  path: '/articles/$title',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/articles/$title': {
      id: '/articles/$title'
      path: '/articles/$title'
      fullPath: '/articles/$title'
      preLoaderRoute: typeof ArticlesTitleImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/articles/$title': typeof ArticlesTitleRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/articles/$title': typeof ArticlesTitleRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/articles/$title': typeof ArticlesTitleRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/articles/$title'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/articles/$title'
  id: '__root__' | '/' | '/articles/$title'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ArticlesTitleRoute: typeof ArticlesTitleRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ArticlesTitleRoute: ArticlesTitleRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/articles/$title"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/articles/$title": {
      "filePath": "articles/$title.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
