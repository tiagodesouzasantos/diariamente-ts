net use k: \\waimea\ServicoLogComexDesembaraco /persistent:no
k:
git push
c:
timeout /t 1 /nobreak
net use k: /delete /y
