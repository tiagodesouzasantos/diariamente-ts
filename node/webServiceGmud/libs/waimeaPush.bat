REM call date.bat
REM @echo on
@echo off
For /f "tokens=1-4 delims=/ " %%i in ("%date%") do (
	set day=%%i
	set month=%%j
	set year=%%k
)
For /f "tokens=1-3 delims=/:/ " %%i in ("%time%") do (
	set hour=%%i
	set min=%%j
	set sec=%%k
)

set filename=%year%%month%%day%%hour%%min%

net use x: \\waimea\ServicoLogComex
net use y: \\waimea\ServicoLogComexBL
net use z: \\waimea\Microled

z:
git push
git status > C:\loggit\waimeaMicroled-%filename%.txt
x:
git push
git status > C:\loggit\waimeaServicoLogComex-%filename%.txt
y:
git push
git status > C:\loggit\waimeaServicoLogComexBL-%filename%.txt

net use z: /delete /y
net use x: /delete /y
net use y: /delete /y

c:
timeout /t 5 /nobreak

net use z: \\waimea\ServicoLogComexDesembaraco
net use x: \\waimea\ServicoLogComexSefaz

z:
git push
git status > C:\loggit\waimeaServicoLogComexDesembaraco-%filename%.txt
x:
git push
git status > C:\loggit\waimeaServicoLogComexSefaz-%filename%.txt

net use z: /delete /y
net use x: /delete /y
c: