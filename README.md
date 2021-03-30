
# Back-end Challenge - Navedex API
Antes de tudo eu configurei um padrão de código com o ESLint, para facilitar o desenvolvimento.

Para o desenvolvimento desta API foi utilizado Typescript, TypeORM, Docker container com image Postgres, Express, Bcrypt para esconder o password dos Users, para os testes de integração utilizei o Jest e o Supertest e para as validações o Yup.



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

**IMPORTANTE**: Antes de clicar em "send" verifique as rotas que solicitam um ID  como parâmetro. Alem disso, nas rotas de criação existem mais de um elemento. Para que funcione,  é necessário enviar um elemento de cada vez, mas eu já deixei todas para facilitar a criação. As rotas "Index / Show" podem ser filtradas a partir da aba "query" do insomnia, basta adicionar o filtro como desejar.

## Para iniciar a plicação:

Para instalar as dependências:

    yarn init
Para rodar as migrations:

    yarn typeorm migrations: run

Para rodar o projeto:

    yarn dev

  No console deve aparecer o log:


    Server's running!⚡⚡⚡

Já está pronto para uso das rotas no Insomnia!!

## Dificuldades

