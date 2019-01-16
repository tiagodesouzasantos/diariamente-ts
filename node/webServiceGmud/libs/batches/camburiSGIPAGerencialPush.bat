net use g: \\CAMBURI\Microled\SGIPA_HOMOLOGACAO_GIT\Gerencial /persistent:no
g:
openfiles /Disconnect /s camburi /OP "c:\Microled\SGIPA_HOMOLOGACAO_GIT\Gerencial\Gerencial_GIT.exe" /ID * /u "newband\servicemicroled1" /p M!CR0l3d2017zaQ!2wsx
timeout /t 1 /nobreak
git pull
c:
net use g: /delete /y