### Imobiliaria - Prime

- ### Escopo do Projeto

    - ## Objetivo Geral:
         -  Desenvolver uma Single Page Application (SPA) utilizando Angular para a "Imobiliária Prime". O objetivo é criar uma plataforma moderna que permita a corretores gerenciar anúncios de imóveis e a clientes pesquisar, visualizar detalhes e manifestar interesse em propriedades, tudo sob um sistema de autenticação e autorização por perfil (Corretor e Cliente).

   - ## Entregáveis Principais
        - Aplicação Angular Funcional (SPA): Implementando todas as funcionalidades de visualização pública, área do cliente e área do corretor.
        - Sistema de Autenticação/Autorização: Login unificado e uso de Guardas de Rota para proteger rotas por perfil (Cliente e Corretor).
        - CRUD de Imóveis: Completo, acessível apenas pelo perfil Corretor.
        - Backend Simulado (JSON Server): Estrutura de dados para simular as operações de backend.
        - Documentação de Protótipos e Diagramas: (UI/UX, Fluxo, Casos de Uso, Classes).

   - ## Limites do Projeto (Exclusões):
         - Backend em Produção: O projeto se limitará ao uso do JSON Server para simulação de API. Não inclui o desenvolvimento de um backend real (ex: Node.js, Spring Boot, etc.) ou implantação em ambiente de produção.
         - Sistema de Mensagens/Chat: A funcionalidade de "Tenho Interesse" não incluirá um sistema de comunicação em tempo real; será apenas o registro do interesse no banco de dados simulado.
         - Gestão de Corretores: O projeto não incluirá uma área de administração para criar/gerenciar contas de corretores. O acesso do corretor será através de contas pré-existentes no db.json.

    - ## Público-Alvo:
         - Corretores de Imóveis: Usuários com o perfil corretor que gerenciarão os anúncios.
         - Clientes (Compradores/Locatários): Usuários com o perfil cliente que buscarão e manifestarão interesse nos imóveis.
         - Visitantes: Usuários não logados que terão acesso às informações públicas (Home, Detalhes do Imóvel).

    - ## Requisitos Funcionais (RF):
         - Os requisitos funcionais definem o que o sistema deve fazer em termos de comportamento e funcionalidades que serão entregues aos usuários (Visitantes, Clientes e Corretores).

       - ## Funcionalidades Públicas (Visitante):
            - Login e Registro: O sistema deve permitir o Login unificado (para Cliente ou Corretor) e o Registro de novos usuários com o perfil de Cliente.
            - Visualização: O usuário deve ser capaz de visualizar a Página Inicial com os imóveis em destaque e acessar os Detalhes de qualquer imóvel.

        - ## Funcionalidades do Cliente (Usuário Logado):
            - Interesse: O Cliente deve poder marcar um imóvel como "Tenho Interesse".
            - Meus Interesses: Deve existir uma área restrita para o Cliente visualizar a lista de imóveis que marcou como interesse.
            - Gestão de Perfil: O Cliente deve poder editar seu próprio perfil e informações.
       
        -  ## Funcionalidades do Corretor (Usuário Logado):
            - Dashboard: O Corretor deve acessar um Dashboard restrito que lista todos os imóveis que ele cadastrou.
            - CRUD de Imóveis: O Corretor deve ter acesso completo às funcionalidades de Criação, Leitura, Edição e Exclusão (CRUD) de seus próprios anúncios de imóveis.
            - Rastreamento de Clientes: O Corretor deve visualizar a lista de Clientes Interessados em seus imóveis específicos.

    - ## Requisitos Não Funcionais (RNF):
        - Os requisitos não funcionais especificam critérios que podem ser usados para julgar a operação de um sistema, em vez de comportamentos específicos.

        - ## Tecnologia e Arquitetura:
            - Tecnologia Base: O projeto deve ser construído em Angular, utilizando o conceito de Standalone Components e o serviço HttpClient para comunicação com a API simulada.
            - Formulários: A gestão de dados em formulários (Login, Registro, CRUD de Imóveis) deve ser feita usando Angular Reactive Forms.
            - Backend Simulado: Será utilizado o JSON Server para simular as operações de backend.
            - Persistência de Sessão: O token de autenticação da sessão do usuário deve ser armazenado via LocalStorage ou SessionStorage.

        - ## Usabilidade e Design:
            - Identidade Visual: A aplicação deve aplicar a paleta de cores da Imobiliária Prime: Verde-esmeralda (#009B77), Cinza-escuro (#333333) e Branco.
            - Estilização: Deve ser utilizado SCSS para gerenciar a estilização do projeto.
            - Responsividade: O layout deve ser responsivo, adaptando-se corretamente a dispositivos móveis e desktop.
            - Performance: A arquitetura de SPA deve garantir que a navegação entre as rotas seja rápida e responsiva.

        - ## Tecnologia:
            - Framework: Angular
            - Linguagem: TypeScript, HTML, SCSS
            - Backend Simulado: JSON Server
            - Autenticação: Token de sessão em LocalStorage/SessionStorage
            - Forms: Angular Reactive Forms

    - ## Estrutura de Componentes e Serviços:
        - A aplicação será organizada em módulos e componentes com responsabilidades bem definidas, seguindo o padrão de injeção de dependência do Angular:

        - ## Serviços Core:
            - AuthService: Gerencia a lógica de Login/Logout, token de sessão, verificação de status de autenticação e recuperação do perfil do usuário.
            - ImoveisService: Realiza todas as operações HTTP (CRUD) relacionadas aos imóveis e buscas, comunicando-se com o JSON Server.

        - ## Guardas de Rota:
            - AuthGuard: Verifica se qualquer usuário está autenticado antes de permitir o acesso a rotas privadas.
            - CorretorGuard: Verifica se o usuário autenticado possui o perfil corretor para liberar o acesso a rotas sensíveis (ex: Dashboard do Corretor).

        - ## Componentes de Visualização (Views):
            - LoginComponent: Componente unificado para autenticação.
            - DashboardImoveisComponent: Área restrita do corretor para a gestão dos anúncios.
            - MeusInteressesComponent: Área restrita do cliente para listar os imóveis salvos.

        - ## Componentes de Template:
            - NavbarComponent: Componente de navegação que deve exibir menus diferentes de acordo com o status de login e o perfil do usuário.

    - ## Estrutura de Dados (JSON Server):
        - O backend será simulado com um arquivo db.json contendo as seguintes entidades:
            - usuarios: Contém os dados de autenticação e perfil dos usuários.
            - Propriedades Chave: id, nome, email, senha, e tipo (que define o perfil: "corretor" ou "cliente").
            - imoveis: Contém os dados dos anúncios gerenciados pelos corretores.
            - Propriedades Chave: id, titulo, corretorId (ID do usuário corretor responsável), tipo, cidade, preco, descricao e imagemUrl.
            - interesses: Relaciona um cliente a um imóvel no qual ele manifestou interesse.
            - Propriedades Chave: id, clienteId (ID do usuário cliente), e imovelId (ID do imóvel).

    