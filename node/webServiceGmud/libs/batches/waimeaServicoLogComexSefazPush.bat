net use k: \\waimea\ServicoLogComexSefaz /persistent:no
k:
git push
c:
timeout /t 1 /nobreak
net use k: /delete /y
