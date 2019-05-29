---
id: doc2
title: Construindo o servidor Node 
sidebar_label: Configuração Nodejs
---

## Node.js

O Node.js é uma plataforma construída sobre o motor JavaScript do Google Chrome para facilmente construir aplicações de rede rápidas e escaláveis. Node.js usa um modelo de I/O direcionada a evento não bloqueante que o torna leve e eficiente, ideal para aplicações em tempo real com troca intensa de dados através de dispositivos distribuídos.

## Instalação

Para instalar o node.js basta acessar: [Node.js](https://nodejs.org). Caso seu SO seja Linux siga os proximos passos.

1. Descompacte o arquivo binário em qualquer diretório que você queira instalar o Node, 
eu uso  ```/ usr / local / lib / nodejs```

```
VERSION=v10.15.0
DISTRO=linux-x64
sudo mkdir -p /usr/local/lib/nodejs
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 
```

2. Defina a variável de ambiente ```~ / .profile```, adicione abaixo ao final

```
# Nodejs
VERSION=v10.15.0
DISTRO=linux-x64
export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH
```

3. Atualizar perfil

```
. ~/.profile
```

4. Testando a instalação

```
$ node -v
```

```
$ npm -v
```

saída no terminal

```
$ node -v
v10.15.3
```
## Setup inicial do projeto

Para montarmos nossa API, iremos utilizar três pacotes do NPM:

### 1-Express

Que será utilizado para montarmos nosso servidor HTTP e manipular as requisições do usuário.

### 2-IBM-Watson

Que é a biblioteca responsável por acessar os serviços do IBM Watson utilizando Node.js.

### 3-Body Parser

Para fazer o parse do corpo das requisições.


Agora que já sabemos quais pacotes iremos utilizar, podemos criar nosso projeto e instalar nossos pacotes.

No seu terminal execute:

```
mkdir server-chatbot
cd server-chatbot
npm init
npm install --save express ibm-watson body-parser
```

Pronto, temos todas as nossas dependências. Let’s code!!

![giphy](https://user-images.githubusercontent.com/30981427/58449506-2d26ea00-80e2-11e9-83b1-b7d4a2830dc7.gif)

## Criando o servidor 

Dentro da pasta do projeto, vamos criar o arquivo app.js, nele vamos configurar o nosso servidor e uma rota que será responsável por capturar a mensagem do usuário.

```
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/conversation/:text*?', (req, res) => {
  const { text } = req.params;

  res.json(text);
});

app.listen(port, () => console.log(`Running on port ${port}`));
```

Ok, agora que temos nossa aplicação, podemos ver ela em ação, vá até sua linha de comando e execute ```node app.js``` após isso acesse seu browser na url http://localhost:3000/conversation/mensagem para ver se está tudo conforme o esperado.

Esse é o básico da nossa API, o intuito dela é pegar a mensagem que o usuário enviar e mandá-la para o Watson, assim que o Watson tiver alguma resposta a retornamos para o usuário.

## Credencias
Antes de finalizarmos a API precisamos pegar as credenciais de serviço no IBM Cloud, que serão responsáveis por fazer a autenticação do nossa aplicação com o serviço da IBM.

Na página de serviços existentes selecione o serviço do Watson Assistant.

Na tela de , você precisará do ID do workspace que está configurado o diálogo do seu bot.

![image](https://user-images.githubusercontent.com/30981427/58450151-15e8fc00-80e4-11e9-8675-ce17173ae514.png)

Na tela de Skills, você precisará do ID do workspace que está configurado o diálogo do seu bot.

![image](https://user-images.githubusercontent.com/30981427/58450319-cb1bb400-80e4-11e9-97d7-d26bf44d2ddd.png)

Pronto, agora com todas as chaves anotadas podemos finalizar nossa API.

## Finalizando a API

Pronto, temos tudo que é fundamental para terminar nossa API.

Vamos importar a nossa biblioteca e configurá-la

```
const AssistantV1 = require('ibm-watson/assistant/v1');
...
const assistant = new AssistantV1({
  version: '2019-02-28',
  iam_apikey: 'sua api key',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});
```

Após isso, dentro da nossa rota, precisamos enviar a mensagem que será recebida para o Watson e retornar a resposta para o usuário.

Só um detalhe, o Watson trabalha com contexto para localizar qual o estado de cada conversa, então é necessário que você passe pra ele o contexto específico de cada conversa durante as requisições.

Emtão, precisamos alterar o tipo de requisição para post para conseguir passar todas as informações no corpo da requisição.

```
...
app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id: '<workspace_id>',
    context,
  };

assistant.message(params, (err, response) => {
    if (err) res.status(500).json(err);
    res.json(response);
  });
});
...
```

Nosso arquivo final irá ficar assim:

```
const AssistantV1 = require('ibm-watson/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000;

const assistant = new AssistantV1({
  iam_apikey: '<iam_apikey>',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-02-16',
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'<workspace_id>',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));
```

Agora basta reiniciar nosso servidor e enviar uma requisição via post para http://localhost:3000/conversation/ com um JSON neste formato:

```
{
    "message": "Olá",
    "context" : {
        
    }
}
```
