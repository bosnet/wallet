
if [ -z $1 ]; then
    SUBDIR="testnet"
elif [ $1 = 'testnet' ]; then
    SUBDIR="testnet"
elif [ $1 = 'mainnet' ]; then
    SUBDIR="mainnet"
else
    echo Usage:
    echo '\tbuild [args]'
    echo 
    echo args: \(Default is testnet\)
    echo '\ttestnet\t\tbuild testnet'
    echo '\tmainnet\t\tbuild mainnet'
fi

echo Delete Existing Files...
for D in `find ./android/ ! -regex '^./android/testnet\(/.*\)?' ! -regex '^./android/mainnet\(/.*\)?' ! -regex '^./android/'`
do
    rm -rf $D
done

echo Copying $SUBDIR Files...
cp -rf ./android/$SUBDIR/. ./android/
# xcopy %cd%\android\%subdir% %cd%\android /s /e /q >nul
echo DONE
echo
echo If you want to run Debug mode :
echo react-native run-android
echo
echo If you want to Build signed Apk file : 
echo react-native run-android --variant=release
echo
