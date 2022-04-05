import { CustomPreloadService } from './services/custom-preload.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // { preloadingStrategy: PreloadAllModules })], Preload all modules when finish the main
    // { preloadingStrategy: CustomPreloadService })], Custom preload Service create Adhoc
    { preloadingStrategy: QuicklinkStrategy })], //Custom preload Service create Adhoc
  exports: [RouterModule]
})
export class AppRoutingModule { }
