# HexScouter-Ionic
A cross-platform scouting app for FRC team 3197 developed with Ionic. Uses Angular.

## Instructions on setting up the Ionic environment
If you would like to try out the app by yourself, you'll need to set up Ionic.
1. Follow the instructions laid out here: https://ionicframework.com/getting-started
2. Clone the repository-- master will have the stable release while google-sheets is the branch I'm working on. Think of it as normal v. canary.
3. It's possible the ios and android assets have not been properly built yet. To fix that, navigate to the root directory of HexScouter (not HexScouterDead) and run

    ionic cap copy

This should copy all of the web assets to android and ios. This may take a while. From there, run

    ionic cap open android

for running the android version. This should start Android Studio. Connect your android phone and activate debugging mode if you haven't done so already. Once your phone name shows up in Android Studio, click the play button to run the app on your phone.

For ios, you'll need to run the following on a mac. Add sudo if it doesn't work.

  ionic cap open ios

This should start up XCode. [INSERT iOS INSTRUCTIONS LATER BECAUSE I DON'T REMEMBER HOW THIS WORKED]
