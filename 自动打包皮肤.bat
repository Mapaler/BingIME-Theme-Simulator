@echo off
REM 7-Zipλ��
set zexe=7-Zip\7zr.exe
set filename= %~n1

"%zexe%" a %filename%.zip %~1\*
::ping localhost -w 1>nul
ren %filename%.zip %filename%.imeskin
move /y %filename%.imeskin %AppData%\Kunlun\Skins
ECHO Ƥ����װ��ɣ�������Զ��˳���
ping localhost -w 10>nul