net use k: \\CAMBURI\Microled /persistent:no
k:
cd k:\SGIPA
git push
c:
timeout /t 1 /nobreak
net use k: /delete /y
