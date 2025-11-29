## notifee

RUN:

```bash
npx expo run:android
```

RESULT:

BUILD FAILED


RUN:

```bash
cd android
./gradlew app:assembleDebug -x lint -x test --configure-on-demand --build-cache -PreactNativeDevServerPort=8081 -PreactNativeArchitectures=arm64-v8a,armeabi-v7a --stacktrace
```

RESULT:

```bash
* What went wrong:
Could not determine the dependencies of task ':app:processDebugResources'.
> Could not resolve all dependencies for configuration ':app:debugRuntimeClasspath'.
   > Could not find any matches for app.notifee:core:+ as no versions of app.notifee:core are available.
     Searched in the following locations:
       - https://dl.google.com/dl/android/maven2/app/notifee/core/maven-metadata.xml
       - https://repo.maven.apache.org/maven2/app/notifee/core/maven-metadata.xml
       - https://www.jitpack.io/app/notifee/core/maven-metadata.xml
       - https://central.sonatype.com/repository/maven-snapshots/app/notifee/core/maven-metadata.xml
     Required by:
         project :app > project :notifee_react-native

* Exception is:
org.gradle.api.internal.tasks.TaskDependencyResolveException: Could not determine the dependencies of task ':app:processDebugResources'.
```
