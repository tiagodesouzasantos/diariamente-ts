
## HeatMonitor
Aplicação pode ser utilizada em qualquer plataforma.
**Requisitos**:
-- Nodejs 8.11.1+ (Instalação: https://nodejs.org/)
A aplicação deverá está no diretório 'C:\node\projetos\HeatTemperature\',
feito isso, abra o terminal e acesse o diretório de instalação, no diretório da instalação rode o comando abaixo:
```bash
$ npm install
```
Fazendo isso ele irá baixar todas as dependecias do projeto.
Para testar a aplicação rode o seguinte comando no terminal:
```bash
$ npm test
```
Aparecerá algo como:
```bash
$ > nodemon index.js
[nodemon] 1.18.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
Runing monitor temperature!
```
Feito isso, agora devemos olhar o arquivo de configuração de nossa aplicação e configurar conforme a necessidade.
O arquivo está dentro da pasta do projeto em "**/config/config.json**"
```json
{
    "monitor_time":1,
    "prefix_file":"Temperatura-",
    "dir_log":"\\\\SERVIDOR\\projetos\\temperatureSms\\files\\",
    "send_msg":false,
    "check_last_temp":2,
    "max_temperature":26.1,
    "copy_file":false,
    "shutdown_src": "\\\\SERVIDOR\\xampp\\htdocs\\teste.txt",
    "shutdown_dst": "\\\\SERVIDOR\\xampp\\htdocs\\teste\\teste.txt",
    "run_batch":false,
    "url_batch":"\\\\SERVIDOR\\xampp\\htdocs\\teste\\teste.bat"
}
```
**O que faz cada parametro**
-- **monitor_time**: De quanto em quanto tempo o app irá verificar a temperatura.
-- **prefix_file**: Prefixo do nome do arquivo de log das temperaturas, exemplo de nome de arquivo "Temperatura-2019-01.txt".
-- **dir_log**: Local onde está os arquivos de log.²
-- **send_msg**: Para ativar basta deixar o valor como true, que sempre que a temperatura ultrapassar o pre-estabelecido enviará mensagem para o Telegram.¹
-- **check_last_temp**: Quantidade de medições que serão avaliadas para tomada de decisão.
-- **max_temperature**: Temperatura máxima em que o servidor pode chegar.
-- **copy_file**: Caso precise copiar um arquivo de um lugar para o outro, basta habilitar essa opção ¹, e configurar com o caminho correto os parametros **shutdown_src** onde está alocado o arquivo, **shutdown_dst** onde ficará o arquivo.²
-- **run_batch**: Ativar opção de rodar um arquivo ".bat" ¹
-- **url_batch**: Caminho ² do arquivo ".bat" caso a opção **run_batch** esteja ativada.

¹ _Os valores aceitos nesse campo são apenas : true ou false, verdadeiro ou falso._
² _Para endereços de diretórios é obrigatório colocar a barra invertida \ para evidenciar que será usado no texto um caracter especial de escape, inclusive usamos 2 barras para identificar apenas uma dentro do texto._

## Instalação como serviço

Em um servidor com windows e o node.js instalado, abra o terminal e vá até o diretório do projeto.
E realize a instalação do projeto como serviço, assim é possivel fazer logoff na máquina que a aplicação continuará rodando automaticamente.
```bash
$ temperatureSms/
$ cd config/
$ node windows-service.js
```
Após rodar esse comando pode verificar na listagem de serviços do windows, que apareceu o seguinte item **HeatTemperature**.

Caso o servidor tenha alguma restrição, de copia de arquivo e execução de bat, verifique com a area de infra-estrutura para que configure o serviço para rodar com um usuário que possa realizar esses tipos de tarefas sem restrições.

Caso tenha qualquer problema com a instalação ou duvida, verifique com o desenvolvedor.

-----
@**package** HeatMonitor
@**author** Tiago Santos
@**copyright** Copyright (c) 2019, Dev.