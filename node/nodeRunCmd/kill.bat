net files | findstr /i "onefile.*\.html"
for /F %%a in ('net files ^|findstr /i "\\onefile.*\.html"') do net files %%a /close