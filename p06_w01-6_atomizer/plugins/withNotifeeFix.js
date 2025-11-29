const { withProjectBuildGradle } = require('@expo/config-plugins');

const withNotifeeFix = (config) => {
    return withProjectBuildGradle(config, (config) => {
        if (config.modResults.language === 'groovy') {
            const contents = config.modResults.contents;
            // Add the repository if it's not already there
            if (!contents.includes('node_modules/@notifee/react-native/android/libs')) {
                config.modResults.contents = contents.replace(
                    /allprojects\s*{\s*repositories\s*{/g,
                    `allprojects {
    repositories {
        maven { url "$rootDir/../node_modules/@notifee/react-native/android/libs" }`
                );
            }
        }
        return config;
    });
};

module.exports = withNotifeeFix;
