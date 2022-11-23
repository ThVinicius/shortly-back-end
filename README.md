<p align="center">
  <img src="./assets/images/logo.svg" height="160px" width="160px">
</p>
<h1 align="center">
  Shortly
</h1>
<div align="center">

  <h3>Construido com</h3>

  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" height="30px"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Sumário

- [Descrição](#description)
- [Documentação da API](#api-reference)
  - [Criar uma conta](#sign-up)
  - [Acessar uma conta](#sign-in)
  - [Rotas do cliente](#customers-routes)
    - [Criar um link encurtado](#post-url)
    - [Buscar uma url pelo seu id](#get-url)
    - [Abrir o link encurtado](#get-open-link)
    - [Deletar um link](#delete-url)
    - [Buscar os links do usuário](#get-all-url-user)
    - [Buscar ranking](#get-ranking)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)

<div id='description'/>

# Descrição

Shortly é um sistema de encurtador de URLs

</br>

## Features

- Criar uma conta e acessa-la.
- Criar um link encurtado
- Acessar um link encurtado
- Visualizar o ranking de usuários com mais links e com mais visitas

</br>

<div id='api-reference'/>

## Documentação da API

### Rotas de autenticação

<div id='sign-up'/>

#### Criar uma conta

rota para criar uma conta

```http
POST /signup
```

<h3>Request:</h3>

| Params            | Type     | Description                        |
| :---------------- | :------- | :--------------------------------- |
| `email`           | `string` | **Required**, **email format**     |
| `name`            | `string` | **Required**, **trim**             |
| `password`        | `string` | **Required**                       |
| `confirmPassword` | `string` | **Required**, **same as password** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `409`       | _Conflito de email_               |

<h3>Success case (status code <span style="color:green">201</span>)</h3>

#

<div id='sign-in'/>

### Acessar uma conta

rota para acessar uma conta, ela retorna um token (JWT)

```http
POST /signin
```

<h3>Request:</h3>

| Params     | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**, **email format** |
| `password` | `string` | **Required**                   |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Email e/ou senha incorreto_      |

<h3>Success case (status code <span style="color:green">200:</span>) and an string as a return. example:</h3>

```javascript
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY1OTcxMTg1LCJleHAiOjE2Njg1NjMxODV9.2_7HCz4GjAE5RzmTQhFVhSAjqLBRkX51pRJ-3BCarRQ'
```

#

<div id='customers-routes'/>

### Rotas do cliente

<div id='post-url'/>

#### Criar um link encurtado

cria um link encurtado, retorna o identificador do link

```http
POST /urls/shorten
```

<h3>Request:</h3>

<h4>Body</h4>

| Params | Type     | Description           |
| :----- | :------- | :-------------------- |
| `url`  | `string` | **Required**, **uri** |

<h4>Headers:</h4>
Envio do token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                                       |
| :---------- | :---------------------------------------------------------- |
| `400`       | _Requisição no formato incorreto_                           |
| `401`       | _Token inválido_                                            |
| `409`       | _Conflito de url (tentado cadastrar uma url já cadastrada)_ |
| `426`       | _Token antigo (precisa gerar um novo token)_                |
| `498`       | _Token expirado_                                            |

<h3>Success case (status code <span style="color:green">201:</span>) and an object as a return. example:</h3>

```json
{
  "shortUrl": "suQmPvKGW"
}
```

#

<div id='get-url'/>

#### Buscar uma url pelo seu id

busca uma url pelo seu id

```http
GET /urls/:id
```

<h3>Request:</h3>

<h4>Params:</h4>
Enviar por params

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `404`       | _Não encontrado_                  |

<h3>Success case (status code <span style="color:green">200:</span>) and an array as a return. example:</h3>

```json
{
  "id": 1,
  "shortUrl": "suQmPvKGW",
  "url": "https://google.com",
  "customerId": 1,
  "visitCount": 0,
  "createAt": "2022-11-22T19:27:52.003Z"
}
```

#

<div id='get-open-link'/>

#### Abrir o link encurtado

Redireciona o usuário para o link inserido, aumenta a contagem do link em 1

```http
GET /urls/open/:shortUrl
```

<h3>Request:</h3>

<h4>Params:</h4>
Enviar por params

| Params     | Type     | Description                  |
| :--------- | :------- | :--------------------------- |
| `shortUrl` | `string` | **required**, **length (9)** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `404`       | _Não encontrado_                  |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

#

<div id='delete-url'/>

#### Deletar um link

```http
DELETE /urls/:id
```

<h3>Request:</h3>

<h4>Params:</h4>
Enviar por params

| Params | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `id`   | `number` | **required**, **greater than 0** |

<h4>Headers:</h4>
Envio do token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                           |
| :---------- | :---------------------------------------------- |
| `400`       | _Requisição no formato incorreto_               |
| `401`       | _Token inválido ou url não pertence ao usuário_ |
| `404`       | _Não encontrado_                                |
| `426`       | _Token antigo (precisa gerar um novo token)_    |
| `498`       | _Token expirado_                                |

<h3>Success case (status code <span style="color:green">204:</span>)</h3>

#

<div id='get-all-url-user'/>

#### Buscar os links do usuário

busca todos os links daquele usuário

```http
GET /users/me
```

<h3>Request:</h3>

<h4>Headers:</h4>
Envio do token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                        |
| :---------- | :------------------------------------------- |
| `401`       | _Token inválido_                             |
| `426`       | _Token antigo (precisa gerar um novo token)_ |
| `498`       | _Token expirado_                             |

<h3>Success case (status code <span style="color:green">200:</span>) and an object as a return. example:</h3>

```json
{
  "id": 1,
  "name": "Pacheco",
  "visitCount": 0,
  "shortenedUrls": [
    {
      "id": 1,
      "shortUrl": "suQmPvKGW",
      "url": "https://google.com",
      "visitCount": 0
    }
  ]
}
```

#

<div id='get-ranking'/>

#### Buscar ranking

busca o top 10 ranking, ordenado pela soma de visitas de seus links

```http
GET /ranking
```

<h3>Response:</h3>

<h3>Success case (status code <span style="color:green">200:</span>) and an array as a return. example:</h3>

```json
[
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 5,
		"visitCount": 100000
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 3,
		"visitCount": 85453
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 10,
		"visitCount": 0
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 0,
		"visitCount": 0
	}
]
```

#

<div id='environment-variables'/>

## Environment Variables

Para rodar esse projeto será necessário criar um arquivo `.env` na pasta raiz do projeto e adicionar as sequintes variaveis:

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:4000`

`JWT_SECRET = any string`

</br>

<div id='run-locally'/>

## Run Locally

Clone o projeto

```bash
  git clone https://github.com/ThVinicius/shortly-back-end.git
```

Vá para o diretório da pasta

```bash
  cd shortly-back-end
```

Instale as dependencias

```bash
  npm install
```

Crie o banco de dados

- Crie um banco no postgreSQL
- Crie as tabelas (uma por uma) de acordo com o arquivo `database.sql`

Inicie o projeto

```bash
  npm run dev
```

</br>

## Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>
