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

net use x: \\cancun\inetpub\wwwroot

x:
git push
git status > C:\loggit\cancunCancunWwwroot-%filename%.txt

net use x: /delete /y

c:
timeout /t 5 /nobreak