
# Back-end Challenge - Navedex API
Antes de tudo eu configurei um padrão de código com o ESLint, para facilitar o desenvolvimento.

Para o desenvolvimento desta API foi utilizado Typescript, TypeORM, Docker container com image Postgres, Express, Bcrypt para esconder o password dos Users, para os testes de integração utilizei o Jest e o Supertest e para as validações o Yup.

Mative a pasta .vscode e alguns comentários para não acusar erros do ESLint ou palavras desconhecidas.


## First of all:
Antes de mais nada vamos criar o banco de dados, no meu caso eu utilizei o Docker, caso tenha o Postgres instalado apenas crie o banco de dados com o nome de "navedex_db", aproveitando para já criar o banco de testes, então crie um segundo banco com o nome de "navedex_db-test".

Para compatibilização crie a conexão com os seguintes dados:

    Host: "localhost",
    Port: "5433", // (não 5432)
    Username: "porstegres",
    Password: "root",


  Para criar um Docker image basta rodar:

    docker run --name navedex-postgres -e POSTGRES_PASSWORD=root -p 5433:5432 -d postgres

  Dessa forma nosso banco está pronto para receber os dados.

## Import Insomnia documentations

Para importar as rotas de test basta clicar no botão abaixo e abir com o Insomnia.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=NavedexAPI&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ffellipehfa%2Fback-end-challenge_navedex-api%2Fmain%2FInsomniaExports%2FInsomnia_Documentations_NavedexAPI.json)

Pode ser que ao clicar em "IMPORT NAVEDEXAPI" te leve a um link dentro do meu github ao invés de solicitar que abra com o Insomnia. Neste caso basta você copiar a URL da qual foi transferido e importar manualmente pelo Insomina. Para isso abra o Insomnia > Applicarion > Preferences > Data > Import Data > From URL > Passe a URL > Fetch and Import.

Caso esteja utilizando o Postman, existe um arquivo JSON na pasta "InsomniaExports". Abra o Postman > Import > Import File > Selecione o arquivo JSON ou você pode Importar pelo link gerado no botão acima, selecionando "Import From Link" ao invés de "Import File".

No próprio corpo da documentação tem algumas dicas de como utilizar cada rota, fique atento ao que elas solicitam.

**IMPORTANTE**: Antes de clicar em "send" verifique as rotas que solicitam um ID  como parâmetro. Alem disso, nas rotas de criação existem mais de um elemento. Para que funcione,  é necessário enviar um elemento de cada vez, mas eu já deixei todas para facilitar a criação. As rotas "Index / Show" podem ser filtradas a partir da aba "query" do insomnia, basta adicionar o filtro como desejar.

## Para iniciar a plicação:

**IMPORTANTE**: Execute os codigos abaixo em sequencia.

Para instalar as dependências:

    yarn

Para rodar as migrations:

    yarn typeorm migrations: run

Para rodar o projeto:

    yarn dev

  No console deve aparecer o log:

    Server's running!⚡⚡⚡

Já está pronto para uso das rotas no Insomnia!!

Caso queira testar, basta rodar:

    yarn test

## Dificuldades

### Token / Debugar o código

Senti que me falta conhecimento para debugar meu código, perdi muito tempo procurando os erros que eventualmente apareciam, isso me custou tempo que eu poderia ter utilizado para tentar implantar o Token de acesso dos users.

### Debugar o código

Como citado acima, tive um pouco de dificuldades ao debugar o código, acabei encontrando meus erros de maneira não convencional, com vários "console.logs". Preciso aprender a utilizar a própria IDE para facilitar essa interação durante o desenvolvimento. O Typescript com o ESLint ajuda um pouco a identificar erros superficiais, mas fica faltando a ferramenta de debug para tratar os erros que não são mostrados na superfície.

### Tests

Tentei adicionar alguns tests com o Jest, mas acabei me embolando um pouco com eles, apenas as rotas de criação e de update passaram no test, as outras foram comentadas.

### Login

Faltou a rota de login, criei uma rota Get apenas para mostrar os Users. Preciso estudar um pouco mais a documentação do Bcrypt para verificar como fazer as validações das senhas com hash

### Rotas Show

Preciso estudar mais a documentação do TypeORM para mostrar apenas as propriedades que eu quero das tabelas relacionadas. Atualmente elas mostram todos os dados que constam na tabelas, exemplo:

    [
	  {
	    "id": "1e88b5a6-6167-423b-8578-5c5a90bf3986",
	    "naver": "Fellipe",
	    "birthdate": "2020-04-07T03:00:00.000Z",
	    "admission_date": "2020-04-07T03:00:00.000Z",
	    "job_role": "New Naver",
	    "created_at": "2021-03-30T21:20:02.992Z",
	    "deleted_at": null,
	    "projects": [
				      {
				        "id": "88516c94-2ea7-4cd7-832d-5597ccc056e8",
				        "project": "Navedex API",
				        "created_at": "2021-03-30T21:16:54.609Z",
				        "deleted_at": null
				      }
					]
	  }
	]

Está retornando todos os elementos dentro do project do naver, quando na verdade deveria retornar apenas os parâmetros que eu solicitar. Exemplo:

    [
	  {
	    "id": "1e88b5a6-6167-423b-8578-5c5a90bf3986",
	    "naver": "Fellipe",
	    "birthdate": "2020-04-07T03:00:00.000Z",
	    "admission_date": "2020-04-07T03:00:00.000Z",
	    "job_role": "New Naver",
	    "created_at": "2021-03-30T21:20:02.992Z",
	    "deleted_at": null,
	    "projects": [
				      {
				        "id": "88516c94-2ea7-4cd7-832d-5597ccc056e8",
				        "project": "Navedex API",
				      }
					]
	  }
	]
A mesma coisa acontece nos outros parâmetros Show.

