# InternetBanking

<div align="center">
  <a href="https://github.com/EriikSilva/crud-primeng-node"><img alt="hits" src="https://hits.sh/github.com/EriikSilva/crud-primeng-node.svg"></a>
  <a href="https://github.com/EriikSilva/crud-primeng-node/graphs/commit-activity"><img src="https://img.shields.io/github/last-commit/EriikSilva/crud-primeng-node"></a>
  <a href="https://github.com/EriikSilva/crud-primeng-node"><img src="https://img.shields.io/badge/
  -InProgress-yellow"></a>
  <a href="https://github.com/EriikSilva/crud-primeng-node/stargazers"><img src="https://img.shields.io/github/stars/EriikSilva/crud-primeng-node?style=social"></a>
  <a href="https://github.com/EriikSilva/crud-primeng-node/network/members"><img src="https://img.shields.io/github/forks/EriikSilva/crud-primeng-node?style=social"></a>
  <a href="https://github.com/EriikSilva"><img src="https://img.shields.io/github/followers/EriikSilva?style=social"></a>
</div>


# 💻 Características
- Proteção de rotas
  - Caso não esteja logado o usuario não conseguiraracessar rotas pela url 
  - Caso esteja logado o usuario não conseguirar acessa a url de login ou criar-conta
- Dados validados
  - Todos os dados são validados assim que o botão de submit é clicado 
  - Verifica se campo é null ou vazio
  - Verifica se email existe caso tente cadastrar um email que ja existe
  - Verifica se conta existe caso tente enviar para uma conta que não existe
  - Verifica se conta não esta zerada caso tente enviar dinheiro
  - Ao criar uma conta o proprio banco de dados(SQL) te concedera um numero de conta que o usuario saberá ao logar
 
# 💬 Sobre
Projeto sobra um banco com features cadastro de conta, transferir para contas existentes e consultar saldo
<br>
- Front-end:angular com primeng.
- Back-end:node com express e mysql.

<b>Features:</b>
<br>
- Toolbar
  - Menu Sidebar
  - Perfil
  - Logout
- Sidebar
  - Página Inicial
  - Histórico de transferência
  - Gráfico (em desenvolvimento)
- Login
  - Fazer Login com email e senha com validações (se email e senha são validos ou campos são validos)
  - Botão criar conta
- Criar Conta
  - Criar conta com email e senha com validações (se email existe ou campos são validos)
  - Botão voltar
- Dashboard 
  - Visualizar seu nome e saldo
  - Botão Transferir dinheiro
  - Botão Visualizar transferências
- Transferências
  - Visualizar transferências (feitas e recebidas)
- Gráfico (em desenvolvimento) 
  - Gráfico de pizza mostrando quantidade gasta e quantidade recebida
# 💾 Instalação
- Necessario Node e Angular
- Clonar o projeto ```git clone https://github.com/internet-banking-angular-node-mysql.git```
- Rodar o comando pelo cmd na pasta do projeto ```npm install```
- Para rodar o back-end é necessario criar uma database com o nome ```internet-banking``` no mysql workbench ou phpmyadmin e copiar os dados que estão na pasta ```backend```  chamada ```db.sql```
- Entrar na pastar ```backend``` e rodar o comando no terminal ```nodemon server.js```
- Rodar o front com o comando no terminal ```ng serve``` e acessar ```http://localhost:4200``` :)


<br>
<h2>Login<h2>
<img src="https://user-images.githubusercontent.com/61124602/217503721-dc980014-7554-4f89-b220-c3c6a2b568ed.png">

<h2>Dashboard<h2>
<img src="https://user-images.githubusercontent.com/61124602/217504032-c3a39e14-3b28-4eba-945d-da70bfb2ff6d.png">

<h2>Fazer Transferência<h2>
<img src="https://user-images.githubusercontent.com/61124602/217504732-456955d2-bcba-4d00-8936-18ad5149991e.png">

<h2>Historico de  Transferência<h2>
<img src="https://user-images.githubusercontent.com/61124602/217505343-02cb13c3-d436-48ea-bd3d-61ddcdea2078.png">

<h2>Perfil<h2>
<img src="https://user-images.githubusercontent.com/61124602/217505551-0768f6a5-d5a8-4e30-b96d-6e00b8cc5db8.png">



