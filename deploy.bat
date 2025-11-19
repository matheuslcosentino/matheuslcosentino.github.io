@echo off
echo ======================================
echo     DEPLOY DO PORTFOLIO - GITHUB
echo ======================================

echo.
echo Limpando build anterior...
if exist dist rmdir /s /q dist

echo.
echo Construindo o projeto...
npm run build

echo.
echo Entrando na pasta dist/public...
cd dist/public

echo.
echo Inicializando Git...
git init
git branch -m main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/matheuslcosentino/game-developer-portfolio.git

echo.
echo Adicionando arquivos...
git add -A

echo.
echo Commitando...
git commit -m "Deploy automatico"

echo.
echo Enviando para o GitHub...
git push -u origin main --force

echo.
echo ======================================
echo        DEPLOY FINALIZADO!
echo ======================================
pause
