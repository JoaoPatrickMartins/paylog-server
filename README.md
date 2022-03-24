<h1 align="center"> Paylog Server</h1>
<p>Back-end da aplicação Paylog. Uma aplicação web para registro e aprovação de pagamentos para uma empresa.</p> 

<h2>Diário de Bordo<h2>
  <h3>21/03/2023 das 18:00h às 22:30h </h3>
    <ul>
      <li> Instalação das dependencias necessárias:
        "cors": "^2.8.5",
        "dotenv": "10.0.0",
        "express": "^4.17.3",
        "mongoose": "6.1.3",
        "nodemon": "^2.0.15",
          "sucrase": "^3.20.3".<li>
      <li> Inicialização do desenvolvimento da estrutura do paylog-server.<li>
      <li> Configuração inicial do server.js.</li>
      <li> Configuração inicial de rotas no routes.js e integração ao server.js. </li>
      <li> Inicialização dos Controllers.</li>
    </ul>
  <h3>23/03/2023</h3>
    <ul>
      <li>implementção do database/index.js e do config/database.js.</li>
      <li>Conexão ao MongoDB utilizando o Mongoose.</li>
    </ul>
  <h3>24/03/2023</h3>
    <ul>
      <li>Debug da Conexão com o MongoDB.</li>
      <li>Refatoramento do código do server.js.</li>
      <li>Inicializando implementação do models/User.js.</li>
      <li>Inicializando implementação do models/requet.js.</li>
      <li>Implementado método show e create no controllers/usersController.js.</li>
      <li>Inserindo nova dependencia "bcryptjs": "2.4.3"</li>
      <li>Implementado criptografia (utilizando criptografia não reversível, do tipo hash) ao password ao método create do usersController.</li>
    </ul> 

    
