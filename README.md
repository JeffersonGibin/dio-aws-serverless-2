# DIO-AWS Serverless Reservas


### Desafio

O desafio proposto pela DIO, consiste em desenvolver e fazer deploy de uma aplicação que ofereça autenticação, autorização e gerenciamento de usuários para suas aplicações Web e Mobile com o Amazon Cognito.


- Utilizar os serviços Amazon Cognito, DynamoDB, API Gateway e AWS Lambda;
- Criar uma API REST no Amazon API Gateway;
- Criar tabela no Amazon DynamoDB;
- Criar funções no AWS Lambda;
- Integrar o API Gateway com o Lambda backend;
- Utilizar a ferramenta No POSTMAN para gerar o token;
- Criar um autorizador do Amazon Cognito para uma API REST no Amazon API Gateway.


### Solução:

Foi desenvolvido uma API de reservas de salas, onde é possível cadastrar reserva, listar reservas e alterar status de uma reserva. A seguir você pode encontrar o contrato da API para conseguir realizar os testes.


Host: http://localhost:3000/dev

- Cadastra as reservas: 
 - **POST**: /reservation
   - **Payload:** `{ "room": "sala 1", "dateStart": "19/04/2023", "dateEnd": "21/04/2023", "responsible": "João"}`

- Busca todas as reservas cadastradas: 
  - **GET**: /reservations

- Altera o status de uma reserva
- **PUT:** /reservation/{id}
  - **Payload:** `{ "status": "CONFIRMED"} // Possiveis status: CANCELLED, CONFIRMED, COMPLETED


### Tecnologias
- AWS API GATEWAY
- AWS Lambda
- AWS DynamoDB
- Node.js
- Serverless Framework
