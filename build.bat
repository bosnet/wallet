@echo off

if "%1" == "" (
    set subdir="testnet"
) else if "%1" == "testnet" (
    set subdir="testnet"
) else if "%1" == "mainnet" (
    set subdir="mainnet"
) else (
    echo Usage:
    echo    build [args]
    echo. 
    echo args: ^(Default is testnet^)
    echo    testnet       build testnet
    echo    mainnet       build mainnet

    exit /b
)

echo [Windows] Build Android only
echo Delete Existing Files...
pushd "%cd%\android" || exit /B 1
for /F %%F in ("*") do (
    del /q "%%~F"
)

for /D %%D in ("*") do (
  IF NOT "%%D" == "testnet" IF NOT "%%D" == "mainnet" rd /s /q "%%~D"
)
popd


echo Copying %subdir% Files...
xcopy %cd%\android\%subdir% %cd%\android /s /e /q /y >nul
echo DONE



echo.
echo If you want to run Debug mode :
echo react-native run-android
echo.
echo If you want to Build signed Apk file : 
echo react-native run-android --variant=release
echo.
