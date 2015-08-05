cordova build --release android

keytool -genkey -v -keystore startuplessons.keystore -alias startuplessons -keyalg RSA -keysize 2048 -validity 10000

password: cuttingedge

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore startuplessons.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk startuplessons


 /home/sunny/android-sdk-linux/build-tools/22.0.1/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk startuplessons.0.0.1.apk