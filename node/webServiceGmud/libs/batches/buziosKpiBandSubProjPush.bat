net use b: \\buzios\xampp\htdocs /persistent:no
b:
git pull
c:
timeout /t 1 /nobreak
net use b: /delete /y
