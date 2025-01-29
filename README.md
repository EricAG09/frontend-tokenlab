Sistema de Gerenciamento de Eventos - Frontend
Este é o frontend da aplicação de gerenciamento de eventos, desenvolvido utilizando React e Material-UI. Ele permite que os usuários visualizem eventos, confirmem presença e os administradores criem novos eventos.

Tecnologias Utilizadas
React: Biblioteca para construção de interfaces.
Material-UI (MUI): Biblioteca de componentes de interface de usuário.
Axios: Para fazer requisições HTTP ao backend.
Styled-components: Para estilização personalizada.
React Router: Para navegação entre páginas.
Pré-requisitos
Certifique-se de ter o Node.js e o npm ou yarn instalados na sua máquina.

Instalação
Clone este repositório para sua máquina local:

bash
Copiar
Editar
git clone https://github.com/seuusuario/projeto-eventos-frontend.git
cd projeto-eventos-frontend
Instale as dependências:

Com o npm:

bash
Copiar
Editar
npm install
Ou, com o yarn:

bash
Copiar
Editar
yarn install
Rodando o Projeto
Inicie a aplicação frontend:

Com o npm:

bash
Copiar
Editar
npm start
Ou, com o yarn:

bash
Copiar
Editar
yarn start
A aplicação estará disponível em http://localhost:3000.

Estrutura do Projeto
src/components: Contém os componentes principais da interface, como EventList, CreateEvent, etc.
src/pages: Contém as páginas principais da aplicação, como Home, Events, etc.
src/styles: Contém estilos personalizados utilizando Material-UI e styled-components.
src/utils: Contém funções auxiliares, como configuração de requisições com Axios.
Funcionalidades
Exibição de Eventos: Exibe todos os eventos cadastrados no sistema.
Criação de Eventos (Para Administradores): Interface para que administradores possam criar novos eventos.
Confirmação de Presença: Usuários podem confirmar presença nos eventos.
Visualização de Eventos Confirmados: Usuários podem visualizar os eventos nos quais confirmaram presença.