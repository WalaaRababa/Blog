import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

export const routes: Routes = [
    {path:'',redirectTo:'/register',pathMatch:'full'},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:DashboardComponent},
    {path:'create',component:CreateArticleComponent},
    {path:'author/:id',component:MyProfileComponent}



];
