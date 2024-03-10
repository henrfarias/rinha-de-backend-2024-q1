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

<div style="display: flex; align-items: center;">
	<img  style="margin-right: 10px" width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/>
  <h3>TypeScript</h3>
</div>
<div style="display: flex; align-items: center;">
	<img  style="margin-right: 10px" width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
  <h3>Node.js</h3>
  <p>20.11.0</p>
</div>
<div style="display: flex; align-items: center;">
	<img  style="margin-right: 10px" width="50" src="https://user-images.githubusercontent.com/46967826/235814699-7bf7e5ce-19d1-469b-9efe-fe89412349d8.png" alt="Fastify" title="Fastify"/>
  <h3>Fastify</h3>
</div>
<div style="display: flex; align-items: center;">
	<img  style="margin-right: 10px" width="50" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" title="Jest"/>
  <h3>Jest</h3>
</div>
<div style="display: flex; align-items: center;">
	<img  style="margin-right: 10px" width="50" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/>
  <h3>PostgreSQL</h3>
</div>
<div style="display: flex; align-items: center;">
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183345125-9a7cd2e6-6ad6-436f-8490-44c903bef84c.png" alt="Nginx" title="Nginx"/>
  <h3>Nginx</h3>
</div>
<div style="display: flex; align-items: center;">
	<img  style="margin-right: 10px" width="50" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" title="Docker"/>
  <h3>Docker</h3>
</div>

