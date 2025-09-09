import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { corretorGuard } from './core/guards/corretor.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { 
    path: 'home', 
    loadComponent: () => import('./views/public/home/home.component')
      .then(m => m.HomeComponent) 
  },

  { 
    path: 'imovel/:id', 
    loadComponent: () => import('./views/public/detalhes-imovel/detalhes-imovel.component')
      .then(m => m.DetalhesImovelComponent) 
  },

  { 
    path: 'login', 
    loadComponent: () => import('./views/auth/login/login.component')
      .then(m => m.LoginComponent) 
  },

  { 
    path: 'registro', 
    loadComponent: () => import('./views/auth/registro-cliente/registro-cliente.component')
      .then(m => m.RegistroClienteComponent)
  },

  { 
    path: 'meus-interesses',
    canActivate: [authGuard], 
    loadComponent: () => import('./views/cliente/meus-interesses/meus-interesses.component')
      .then(m => m.MeusInteressesComponent) 
  },

  { 
    path: 'dashboard', 
    canActivate: [corretorGuard], 
    loadComponent: () => import('./views/corretor/dashbord-imoveis/dashboard-imoveis.component')
      .then(m => m.DashboardImoveisComponent)
  },

  { 
    path: 'acesso-negado', 
    loadComponent: () => import('./views/public/home/home.component')
      .then(m => m.HomeComponent), 
    data: { denied: true } 
  },

  { path: '**', redirectTo: 'home' }
];