## O principal assunto dessa Rinha trata de controle de concorrência com o tema créditos e débitos

> Transações
 - [ ] POST /clientes/[id]/transacoes
  ```json
   {
      "valor": 1000,
      "tipo" : "c",
      "descricao" : "descricao"
    }
  ```
  > Extrato
  - [ ] GET /clientes/[id]/extrato

  > Requisitos de entrega - PR no [repositório](https://github.com/zanfranceschi/rinha-de-backend-2024-q1)
  - [ ] Cadastro inicial de clientes
  - [ ] Containerizar
  - [ ] docker-compose.yml (com limitações de CPU e memória)
  - [ ] README.md

  > Arquitetura mínima da API
  - [ ] Load balancer - Round Robin - Porta 9999
  - [ ] 2 Instâncias de servidores web
  - [ ] Um banco de dados (Qualquer um que não seja cache)