import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './auth/home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeResolver} from './auth/home/home.resolver';
import { Router } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        resolve: {home: HomeResolver},
        children: [
            {
                path: 'dashboard', loadChildren: () => import('./auth/dashboard/dashboard.module').then(mod => mod.DashboardModule)
            },
            {
                path: '', redirectTo: 'dashboard', pathMatch: 'full',
            },
            {
                path: 'change-password',
                loadChildren: () => import('./security/change-password/change-password.module').then(mod => mod.ChangePasswordModule)
            },
            {
                path: 'my-profile',
                loadChildren: () => import('./auth/my-profile/my-profile.module').then(mod => mod.MyProfileModule)
            },
            {
                path: 'sites',
                loadChildren: () => import('./auth/office/office.module').then(mod => mod.OfficeModule)
            },
            {
                path: 'subsite',
                loadChildren: () => import('./auth/sub-site/subsite.module').then(mod => mod.SubSiteModule)
            },
            {
                path: 'asset-model',
                loadChildren: () => import('./auth/asset-model/asset-model.module').then(mod => mod.AssetModelModule)
            },
            {
                path: 'asset-category',
                loadChildren: () => import('./auth/asset-category/asset-category.module').then(mod => mod.AssetCategoryModule)
            },
            {
                path: 'asset-subcategory',
                loadChildren: () => import('./auth/asset-subcategory/asset-subcategory.module').then(mod => mod.AssetSubcategoryModule)
            },
            {
                path: 'manufacturer',
                loadChildren: () => import('./auth/manufacturer/manufacturer.module').then(mod => mod.ManufacturerModule)
            },
            {
                path: 'vendor',
                loadChildren: () => import('./auth/vendor/vendor.module').then(mod => mod.VendorModule)
            },
            {
                path: 'responsible-person',
                loadChildren: () => import('./auth/responsible-person/responsible-person.module').then(mod => mod.ResponsiblePersonModule)
            },
            {
                path: 'asset',
                loadChildren: () => import('./auth/asset/asset.module').then(mod => mod.AssetModule)
            },
            {
                path: 'license',
                loadChildren: () => import('./auth/license/license.module').then(mod => mod.LicenseModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/report.module').then(mod => mod.ReportModule)
                
            },
            {
                path: 'role',
                loadChildren: () => import('./auth/settings/role/role.module').then(mod => mod.RoleModule)
            },
            {
                path: 'create-role',
                loadChildren: () => import('./auth/settings/role/role.module').then(mod => mod.RoleModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./auth/settings/users/users.module').then(mod => mod.UsersModule)
            },
            {
                path: 'designation',
                loadChildren: () => import('./auth/designation/designation-routing.module').then(mod => mod.DesignationRoutingModule)
            },
            {
                path: 'employee',
                loadChildren: () => import('./auth/employee/employee-routing.module').then(mod => mod.EmployeeRoutingModule)
            },
            {
                path: 'issue-log',
                loadChildren: () => import('./auth/issue-log/issue-log-routing.module').then(mod => mod.IssueLogRoutingModule)
            },
            {
                path: 'issue-comments',
                loadChildren: () => import('./auth/issue-comments/issue-comments-routing.module').then(mod => mod.IssueCommentsRoutingModule)
            }
            
        ]
    },
    {
        path: 'login',
        children: [
            {path: '', component: LoginComponent}
        ]
    },

    {
        path: 'forgot-userid-password',
        loadChildren: () => import('./security/forgot-userid-password/forgot-userid-password.module').then(mod => mod.ForgotUseridPasswordModule)
    },
    {
        path: 'session-expired',
        loadChildren: () => import('./security/session-expired/session-expired.module').then(mod => mod.SessionExpiredModule)
    },
    {
        path: 'page-not-found',
        loadChildren: () => import('./security/page-not-found/page-not-found.module').then(mod => mod.PageNotFoundModule)
    },

    {
        path: '**',
        redirectTo: 'page-not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
