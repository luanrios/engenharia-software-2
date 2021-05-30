Estruturação do projeto:

web         # Projeto web
- package.json  # Contém especificações alto nível do projeto, como dependências e afins
- yarn.lock     # Contém especificação em baixo nível da árvore de dependências do projeto
- .env.local    # Contém variáveis de ambiente utilizadas para abrir conexão com backend do projeto
- public        # Contém recursos de acessibilidade pública como imagens e robots.txt
  - ...
- src           # Contém código fonte do projeto
  - firebase.js     # Provê conexão com serviço de backend do firebase utilizando variáveis locais fornecidas por .env.local
  - index.js        # Instancia e renderiza aplicação react
  - contexts        # Mantém contextos do projeto
    - AuthContext.js    # Fornece contexto de autenticação e sessão para o App utilizando firebase
  - components      # Mantém componentes do projeto
    - App.js            # Componente da aplicação (instanciado em ../index.js) onde se encontram rotas do projeto
    - Login.js          # View de login
    - Signup.js         # View de criação de usuário
    - ForgotPassword.js # View de recuperação de senha
    - Dashboard.js      # Home de usuários autenticados (endpoint de redirecionamento para exceções encontradas)
    - UpdateProfile.js  # View de edição de informações de usuário (ex. troca de senha)
    - PrivateRoute.js   # Wrapper de rotas que necessitem de autenticação (redireciona para login caso não autenticado)
    - CreateBook.js     # View para criação de livros
    - EditBook.js       # View para edição de livros
    - DetailBook.js     # View para visualização de livros
