@echo off
net files | findstr /i "%1.*\.%2"
for /F %%a in ('net files ^|findstr /i "\\%1.*\.%2"') do net files %%a /close