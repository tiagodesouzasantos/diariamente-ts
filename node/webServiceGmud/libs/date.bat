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