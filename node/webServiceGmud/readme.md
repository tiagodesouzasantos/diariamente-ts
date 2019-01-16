
## Gmud - (Angular2+ / NodeJs)

A aplicação é voltada somente para "SO" **windows**.

**IMPORTANTE**: Todo o código fonte deverá esta no seguinte caminho "C:\node\projetos\webServiceGmud",

se não for possivel seguir nesse diretório, será necessário customizar os dados do passo **Google firebase** o caminho fica no nó "update".

- É necessário ter o nodejs instalado na maquina, ele será o responsavel por rodar o projeto.

Para realizar o download e instalação basta seguite esse link https://nodejs.org/en/download/

- Após instalação, no diretório raiz do projeto, utilizando o terminal, rode o seguinte comando.:

```bash
$ npm install
```

Feito isso ele irá instalar todas as dependências do seu projeto node.
- Para manipular o angularJs2+ você precisará de uma lib chamada **angular cli**, para instalar ela rode o seguinte comando no terminal.:
```bash
$ npm install -g @angular/cli
```
Utilizamos o comando -g para que a instalação seja global para todos os projetos.

## Google firebase
A aplicação hoje utiliza o google firebase como base dados (NoSql), exemplo.:

```json
{
    "servers":[
    "buzios":{"softwares":[
        {
            "name":"KPI",
            "update":"C:/node/projetos/webServiceGmud/libs/batches/buziosKpiBandSubProjPush.bat"
        }
    ]},
    "camburi":{"softwares":[
        {
            "name":"operador",
            "update":"C:/node/projetos/webServiceGmud/libs/batches/camburiOperadorPush.bat"
        },
        {   
            "name":"yardDesigner",
            "update":"C:/node/projetos/webServiceGmud/libs/batches/camburiYardDesignerPush.bat"
        },
        {
        "name":"SGIPA",
        "update":"C:/node/projetos/webServiceGmud/libs/batches/camburiSGIPAPush.bat"
        }
    ]},
]}
```

Caso seja preciso mudar a conta da base de dados ou gerar uma nova, basta no firebase gerar a chave e colocar no seguinte caminho **api/v1/serviceAccountKey.js**, lembrando que o nome deve ser o mesmo, tanto do arquivo quanto da nova base de dados, caso contrario será necessário mexer no código fonte.

## Instalando p/ servidores

Para que o projeto rode os comandos git são necessários alguns passos.:
- O git deve estar instalado em sua maquina para isso basta acessar o seguinte link https://git-scm.com/downloads .
- Deve existir um usuário com permissão de acesso full nos repositórios que serão manipulados pela aplicação.
- Os arquivos com configuração de cada repositório está no dir **libs/batches** cada arquivo é responsavel

por favor a interação do servidor com o repositório no bitbucket.

```bash
$ net use b: \\buzios\xampp\htdocs /persistent:no
$ b:
$ git pull
$ c:
$ timeout /t 1 /nobreak
$ net use b: /delete /y
```

Nesse código acima ele mapeia uma unidade do servidor com o endereço do diretório git que será atualizado.

Acessa o diretório, roda a atualização do git, sai do diretório e remove o mapeamento.

Deve-se tomar cuidado para selecionar uma unidade que não será usada, para que não haja conflito entre os mapeamentos do windows.

  
## Rodando o app

Com todos os passos acima a aplicação já está pronta para rodar, para isso no terminal acesse o diretório do projeto e rode o seguinte comando.:

```bash
$ npm start
```

Se todas as configurações estiverem ok, ele irá imprimir na tela a seguinte mensagem.:

```bash
$ Gmude RESTful API server started on: 3000
```
Abra um navegador de sua preferencia no servidor e acesse o seguinte endereço http://localhost:3000.

O serviço irá rodar somente localmente ou na rede em que o servidor estiver configurado e deverá ser acessado da seguinte maneira.:
http://servidor-alocado:3000/

Atualmente o servidor de teste é.:
http://trancoso:3000/


## Instalando como serviço no windows

É necessário realizar os passos acima e a aplicação estar rodando.
Feito isso, abra o terminal e vá até o caminho configs e rode o seguinte comando.

```bash
$ node windows-service.js
```
Após rodar o comando no terminal não acontecerá nada, simplesmente abrir o terminal para digitar novos comandos, após isso siga esses passos.:

- No windows vá em painel de controle, Ferramentas Administrativas e Serviços (Abra a aplicação).
- Na tela dos serviços procure por Gmud, clique com o botão direito e vá em propriedades.
- Vá na aba logon e selecione a opção: "Está conta" será necessário utilizar o usuário que tem acesso a todos os servidores com repositório git, esse usuário precisará ter acesso "full".
- No aplicativo **Kee Pass (Bandeirantes)** no banco de "SISTEMAS_DEV" existe um usuário para os sistemas microled.
- Feito isso, é só reiniciar o serviço que a atualização de usuário entrará em vigor.
-----

@package Gmud

@author Tiago Santos

@copyright Copyright (c) 2019, Bandeirantes Logistica Integrada