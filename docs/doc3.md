---
id: doc3
title: React Native
sidebar_label: Montando o ambiente de desenvolvimento
---

## React Native

O React Native é um framework baseado no já aclamado React, desenvolvido pela equipe do Facebook, que possibilita o desenvolvimento de aplicações mobile, tanto para Android, como para iOS, utilizando apenas Javascript.

![image](https://user-images.githubusercontent.com/30981427/58473743-c6282600-811f-11e9-8d48-5317aaa8340f.png)

### Como desenvolver com React Native?

Para começar usar o react native, precisará instalar algumas dependências. São elas:

* Node
* React Native CLI
* Python2
* JDK8
* SDK do Android

### Instalação de dependências

Para instalar o Node, Python2 e JDK8, execute o comando:

```
choco install -y nodejs.install python2 jdk8 
```

> caso vocẽ não tenha o chocolatey acesse [https://chocolatey.org/](https://chocolatey.org/)

Para instalar o React Native CLI execute o comando:

```
npm install -g react-native-cli
```

### Ambiente de desenvolvimento Android

Configurar seu ambiente de desenvolvimento pode ser um pouco entediante se você for novo no desenvolvimento do Android. Se você já está familiarizado com o desenvolvimento do Android, há algumas coisas que você pode precisar configurar. Em ambos os casos, certifique-se de seguir cuidadosamente as próximas etapas.

#### 1. Instale o Android Studio

Faça o download e instale o Android Studio . Escolha uma configuração "Personalizada" quando solicitado a selecionar um tipo de instalação. Verifique se as caixas ao lado de todos os itens a seguir estão marcadas:

- Android SDK
- Android SDK Platform
- Android Virtual Device

Em seguida, clique em "Next" para instalar todos esses componentes.

Quando a configuração for finalizada e você for apresentado à tela de boas-vindas, vá para a próxima etapa.

#### 2. Instale o SDK do Android
O Android Studio instala o SDK do Android mais recente por padrão. Construir um aplicativo React Native com código nativo, no entanto, requer o Android 9 (Pie)SDK em particular. SDKs adicionais para Android podem ser instalados por meio do SDK Manager no Android Studio.

O SDK Manager pode ser acessado na tela "Bem-vindo ao Android Studio". Clique em "Configurar" e selecione "SDK Manager".

Selecione a guia "Plataformas do SDK" no Gerenciador do SDK e marque a caixa ao lado de "Mostrar detalhes do pacote" no canto inferior direito. Procure e expanda a Android 9 (Pie)entrada e verifique se os seguintes itens estão marcados:

- Android SDK Platform 28
- Intel x86 Atom_64 System Image ou Google APIs Intel x86 Atom System Image

Em seguida, selecione a guia "Ferramentas do SDK" e marque a caixa ao lado de "Mostrar detalhes do pacote" aqui também. Procure e expanda a entrada "Android SDK Build-Tools" e verifique se ela 28.0.3está selecionada.

Por fim, clique em "Aplicar" para baixar e instalar o Android SDK e as ferramentas de criação relacionadas.

#### 3. Configure a variável de ambiente ANDROID_HOME
As ferramentas React Native exigem que algumas variáveis ​​de ambiente sejam configuradas para criar aplicativos com código nativo.

Adicione as seguintes linhas ao seu ```$HOME/.bash_profile``` arquivo de configuração:

```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

> .bash_profileé específico para bash. Se você estiver usando outro shell, precisará editar o arquivo de configuração específico do shell apropriado.

Digite source ```$HOME/.bash_profile``` para carregar a configuração no seu shell atual. Verifique se ANDROID_HOME foi adicionado ao seu caminho executando echo $PATH.

> Por favor, certifique-se de usar o caminho correto do Android SDK. Você pode encontrar a localização real do SDK na caixa de diálogo "Preferências" do Android Studio, em Aparência e comportamento → Configurações do sistema → SDK do Android .

