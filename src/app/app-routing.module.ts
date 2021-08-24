import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  // { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  
  {
    path: '',
    loadChildren:
    './pages/homepage/homepage.module#HomepagePageModule'  
    //'./pages/intro/intro.module#IntroPageModule'
  },

  {
    path: 'list',
    loadChildren:
      './pages/home-results/home-results.module#HomeResultsPageModule'
  },

  {
    path: 'home',
    loadChildren:
      './pages/homepage/homepage.module#HomepagePageModule'
  },

  {
    path: 'login',
    loadChildren:
      './pages/login/login.module#LoginPageModule'
  },

  {
    path: 'news',
    loadChildren:
      './pages/news-results/news-results.module#NewsResultsPageModule'
  },

  { path: 'area/:id', canActivate: [AuthGuard], loadChildren: './pages/area-page/area-page.module#AreaPageModule'},
  { path: 'area-subpage/:id', canActivate: [AuthGuard], loadChildren: './pages/area-subpage/area-subpage.module#AreaSubPageModule' },
  { path: 'area-products/:id', canActivate: [AuthGuard], loadChildren: './pages/area-products/area-products.module#AreaProductsPageModule' },

  { path: 'document/:id', loadChildren: './pages/pdf-viewer/pdf-viewer.module#PdfViewerPageModule' },


  { path: 'page/:id', loadChildren: './pages/page/page.module#PagePageModule' },

  { path: 'subpage/:id', loadChildren: './pages/subpage/subpage.module#SubpagePageModule' },

  {
    path: 'home-results',
    loadChildren:
      './pages/home-results/home-results.module#HomeResultsPageModule'
  },


   { path: 'detail/:id', loadChildren: './pages/detail/detail.module#DetailPageModule' },


   { path: 'news-detail/:id', loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },

  {
    path: 'item-details',
    loadChildren:
      './pages/modal/item-details/item-details.module#ItemDetailsPageModule'
  },

 /* { path: 'detail/:id', loadChildren: './pages/modal/item-details/item-details.module#ItemDetailsPageModule' },
 */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
