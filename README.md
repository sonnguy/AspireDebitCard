# Aspire DebitCard

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Setup and run

- Run ```npm install``` or ```yarn```
- Run ```npx pod-install ios``` or ```cd ios && pod install && cd ../```
- Run `yarn ios` or `yarn android`

#### Android issue

  * What went wrong: Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'. SDK location not found. Define location with an ANDROID_SDK_ROOT environment variable or by setting the sdk.dir path in your project's local properties file at...

##### Follow these step to resolve:
     1. Create local.properties file in android folder
     2. Add 'sdk.dir = /Users/<USERNAME>/Library/Android/sdk' to the file.


## Folder structure

This template follows a very simple project structure:

- `__tests__`: This folder is store all unit test script.
- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component that use through your app (such as a generic button)
  - `constants`: Folder to store any kind of constant.
  - `navigation`: Folder to store the navigators.
  - `screens`: Folder that contains all application screens/features.
  - `store`: Folder to put all redux middlewares and the store.
      - `actions`: This folder contains all actions that can be dispatched to redux.
      - `constants`: This folder contains static values used within the feature.
      - `saga`: This folder should have all saga, and expose the combined result using its `rootSaga.ts`.
      - `reducers`: This folder should have all reducers, and expose the combined result using its `rootReducer.ts`
      - `services`: The service folder contains logic, related to external API communications.
  - `styles`: Folder to store any common style that use through your app.      
  - `utils`: All the utils/helpers files go here that storing reusable methods and logic.
- `App.tsx`: Main component that starts your whole app.
- `index.js`: Entry point of your application as per React-Native standards.

 ## Requirement - User stories
 Assumption that user already have account in system and application need to show user debit card information and their configuration.
 1. As a user, after login I select "Debit" menu to know about my debit card information such as: Card infor, Available balance, Top-up, Weekly spending limit, Freeze card, Get a new card, Deactivated card.
 2. As a user, I want to set my weekly spending limit, I can input number or select with suggestion options.
 3. As a user, I want to turn on/off weekly spending limit for "Alarm" when I reached limitation.
 4. As a user, I want to turn on/off freeze card.
 
  ## Noted
 You can change `USER_ID` value to `1` or `2` in `DebitCardScreen` for testing.

