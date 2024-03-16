## Start up
Para rodar o projeto localmente será necessário:

- Instalar as dependências:
```bash
npm i
```

- Copiar as variáveis do `.env.example` para `.env` com uma configuração de banco de dados postgresql

- Iniciar o servidor com o comando:
```bash
npm run start
```
>  #### Ambiente de dev
> É possível iniciar o servidor com *hot reload* utilizando o comando:
> ```bash
>   npm run dev
> ```


### Testes
O repositório também conta com testes unitários e de integração.
O objetivo deste repositório é ser didático, portanto, caso queira rodar os testes, existem estes comandos:
```bash
  # Roda os testes unitários: 
  ## Testa as funcionalidades de domínio e casos de uso sem a influência de bibliotecas externas;
  npm test
```
```bash
  # Roda os testes de integração:
  ## Testa operações partindo da requisição do usuário (denominado aqui como endToEnd).
  npm run test:int
```
> **Importante** mencionar que para os testes de integração funcionarem corretamente, é necessário criar um arquivo `.env.testing` a partir do `.env.example`. Pois o jest irá buscar as variáveis de ambiente deste arquivo. Você pode utilizar as mesmas variáveis do `.env`, mas tenha em mente que os testes de integração irão limpar os dados do banco ao terminar os testes.
## Autores

* Ádrian de Freitas Ferreira \<adrian.fr.fe@gmail.com\>

* Henrique Biasibetti Farias \<henrique.biasibetti@gmail.com\>

## Repositório
https://github.com/henrfarias/rinha-de-backend-2024-q1

## Tecnologias utilizadas

- [Typescript](https://www.typescriptlang.org/)
- [Node.JS (v20.11.0)](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [Jest](https://jestjs.io/pt-BR/)
- [PostgreSQL](https://www.postgresql.org/docs/current/)
- [Nginx](https://www.nginx.com/)
- [Docker](https://www.docker.com/)
