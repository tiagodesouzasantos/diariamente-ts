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


net use x: \\paradise\Microled_Fatura
net use y: \\paradise\Microled_Operador

x:
git push
git status > C:\loggit\paradiseMicroledFatura-%filename%.txt
y:
git push
git status > C:\loggit\paradiseMicroledOperador-%filename%.txt

net use x: /delete /y
net use y: /delete /y

c:
timeout /t 3 /nobreak

net use x: \\paradise\Microled_WMS
net use y: \\paradise\Microled_Redex\Redex

x:
git push
git status > C:\loggit\paradiseMicroledWMS-%filename%.txt
y:
git push
git status > C:\loggit\paradiseMicroledRedex-%filename%.txt

timeout /t 3 /nobreak

net use x: /delete /y
net use y: /delete /y
c: