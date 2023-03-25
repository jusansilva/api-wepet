# WePet Api

## Inicio

- Api Rest baseado em express api para conexão de serviços da aplicação WePet

## Primeiros passos 

### Clonar o Repositório

`git clone https://github.com/jusansilva/api-wepet.git`


### Instalar as dependencias 

`npm install`

### Instalar Nodemon e PM2 de forma global

`npm i nodemon -g && npm i pm2 -g`

- dessa forma poderar rodar em ambiente de desenvolvimento sem grandes problemas 


### Configurar .env

- crie um arquivo nomeado como .env
- nele ira configurar as seguintes configurações 

PORT= porta em que sua aplicação irar rodar ex: PORT=3000
URL= url que sera configurado o callback, ou seja a url que sua aplicação estar rodando em desenvolvimento ex URL=http://localhost:3000

### configure o wepetkey.json

- crie dentro da pasta config um arquivo chamado wepetkey.json
- dentro desse arquivo configure conforme a configuração do firebase 

ex: `"type": "tipo do serviço",
  "project_id": "seu projeto",
  "private_key_id": "id da sua chavew secreta",
  "private_key": "sua chave secreta",
  "client_email": "firebase-adminsdk-g8vfl@wepet-2ef94.iam.gserviceaccount.com",
  "client_id": "id de cliente no firebase",
  "auth_uri": "url de autenticação",
  "token_uri": "url para token",
  "auth_provider_x509_cert_url": "url de auth provider",
  "client_x509_cert_url": "url de cliente"`


### Vamos rodar a Aplicação em ambiente de desenvolviemnto

`npm run dev`

- nesse momento o nodemon ira rodar a aplicação localmente na porta configurada 

ex: `http://localhost:3000`


## Endpoints Prontos

### cadastro 

`curl --request POST \
  --url http://localhost:3000/signup \
  --header 'Content-Type: application/json' \
  --data '{
	"email": string,
	"password": string
}'`
- response: 
{
	"uid": "string",
	"email": "string",
	"emailVerified": boolean,
	"disabled": boolean,
	"metadata": {
		"lastSignInTime": Timestamp,
		"creationTime": Timestamp,
		"lastRefreshTime": Timestamp
	},
	"tokensValidAfterTime": Timestamp,
	"providerData": [
		{
			"uid": string,
			"email": string,
			"providerId": string
		}
	]
}


### Login

`curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "jusanmagno@gmail.com",
	"password": "Isabelly_09"
}'`

- response: 

{
	"link": string
}


### cadastro de Pet

`curl --request POST \
  --url http://localhost:3000/pet \
  --header 'Content-Type: application/json' \
  --data '{
	
	"nome": "string",
      "especie": "string",
      "genero": bolean,(true = masculino, false = feminino)
      "raca": "string",
      "nasc": "Timestamp",
      "responsavelId": "string",
      "foto": "string"
}'`

- response: []

### atualização de pet

`curl --request PUT \
  --url http://localhost:3000/pet/6ZzgSPlLI5uSH85SQWN0 \
  --header 'Content-Type: application/json' \
  --data '{
	"nome": "string",
      "especie": "string",
      "genero": bolean,(true = masculino, false = feminino)
      "raca": "string",
      "nasc": "Timestamp",
      "responsavelId": "string",
      "foto": "string"
    
}'`

- response: 
{
	"_writeTime": {
		"_seconds": number,
		"_nanoseconds": number
	}
}

### Buscar todos os Pets

`curl --request GET \
  --url http://localhost:3000/pet`

- response: 
[
    {
       "nome": "string",
      "especie": "string",
      "genero": bolean,(true = masculino, false = feminino)
      "raca": "string",
      "nasc": "Timestamp",
      "responsavelId": "string",
      "foto": "string"
    },
]


### buscar Pets por id 

`curl --request GET \
  --url http://localhost:3000/pet/:id_do_pet`

-response:
    {
       "nome": "string",
      "especie": "string",
      "genero": bolean,(true = masculino, false = feminino)
      "raca": "string",
      "nasc": "Timestamp",
      "responsavelId": "string",
      "foto": "string"
    }

### Buscar pet por id do responsavel

`curl --request GET \
  --url http://localhost:3000/pet/owner/responsavel_id`

- response: 
[
    {
       "nome": "string",
      "especie": "string",
      "genero": bolean,(true = masculino, false = feminino)
      "raca": "string",
      "nasc": "Timestamp",
      "responsavelId": "string",
      "foto": "string"
    },
]


### Mudar responsabilidade do pet 

`curl --request PUT \
  --url http://localhost:3000/pet/change/owner/id_do_pet \
  --header 'Content-Type: application/json' \
  --data '{
  "responsavelId": "string"   
}'

- response: 
{
	"_writeTime": {
		"_seconds": number,
		"_nanoseconds": number
	}
}


### Deletar Pet

`curl --request DELETE \
  --url http://localhost:3000/pet/id_do_pet`

- response: 
{
	"_writeTime": {
		"_seconds": number,
		"_nanoseconds": number
	}
}
