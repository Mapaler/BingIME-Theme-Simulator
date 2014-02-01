@echo off
REM 7-Zip位置
set zexe=7-Zip\7zr.exe
set filename= %~n1

"%zexe%" a %filename%.zip %~1\*
::ping localhost -w 1>nul
ren %filename%.zip %filename%.imeskin
move /y %filename%.imeskin %AppData%\Kunlun\Skins
ECHO 皮肤安装完成，程序会自动退出。
ping localhost -w 10>nul