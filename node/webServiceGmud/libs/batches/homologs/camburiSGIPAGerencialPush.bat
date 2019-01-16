net use g: \\CAMBURI\Microled\SGIPA_HOMOLOGACAO_GIT\Gerencial /persistent:no
g:
openfiles /Disconnect /s camburi.new.band /op "C:\Microled\SGIPA_HOMOLOGACAO_GIT\Gerencial\Gerencial_GIT.exe" /id *
git push
g:
timeout /t 1 /nobreak
net use g: /delete /y
