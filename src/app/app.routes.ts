import { Routes } from '@angular/router';
import { HomeComponent } from './views/public/home/home.component';
import { LoginComponent } from './views/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { corretorGuard } from './core/guards/corretor.guard';
import { DashboardImoveisComponent } from './views/corretor/dashbord-imoveis/dashboard-imoveis.component';
import { MeusInteressesComponent } from './views/cliente/meus-interesses/meus-interesses.component';
import { RegistroClienteComponent } from './views/auth/registro-cliente/registro-cliente.component';
import { DetalhesImovelComponent } from './views/public/detalhes-imovel/detalhes-imovel.component';

// --- CONFIGURAÇÃO PARA PRERENDERING (SOLUÇÃO PARA O ERRO) ---

// URL base da sua API JSON Server
const API_BASE_URL = 'http://localhost:3008';

/**
 * Busca todos os IDs de imóveis da API para que o Angular CLI
 * saiba quais rotas dinâmicas pré-renderizar (imovel/1, imovel/2, etc.).
 * @returns Um array de objetos no formato { id: string }
 */
const getPrerenderParamsForImoveis = async () => {
  // Nota: O fetch funcionará porque corrigimos o app.config.server.ts com withFetch()
  const response = await fetch(`${API_BASE_URL}/imoveis`);
  
  if (!response.ok) {
    console.error(`Falha ao buscar imóveis para prerendering: ${response.status}`);
    return []; 
  }
  
  const imoveis = await response.json();

  // Retorna o formato exigido: { id: valor_do_parametro }
  return imoveis.map((imovel: any) => ({ 
      id: imovel.id.toString() 
  }));
};

// -----------------------------------------------------------

export const routes: Routes = [
    // ROTAS REDUNDANTES: Removi as definições não lazy-loaded para evitar confusão no roteamento do Angular
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
    // Rota padrão (Home)
    { 
        path: 'home', 
        loadComponent: () => import('./views/public/home/home.component')
        .then(m => m.HomeComponent) 
    },

    // Rota dinâmica de IMÓVEL CORRIGIDA COM PRERENDERING
    { 
        path: 'imovel/:id', 
        loadComponent: () => import('./views/public/detalhes-imovel/detalhes-imovel.component')
        .then(m => m.DetalhesImovelComponent),
        data: {
          prerender: {
            getPrerenderParams: getPrerenderParamsForImoveis // Função adicionada aqui
          }
        }
    },

    // Rotas de Autenticação e Registro
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

    // Rotas Protegidas (Cliente e Corretor)
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

    // Rota de Acesso Negado (usando Home como fallback)
    { 
        path: 'acesso-negado', 
        loadComponent: () => import('./views/public/home/home.component')
        .then(m => m.HomeComponent), 
        data: { denied: true } 
    },

    // Wildcard (qualquer outra rota)
    { path: '**', redirectTo: 'home' }
];
