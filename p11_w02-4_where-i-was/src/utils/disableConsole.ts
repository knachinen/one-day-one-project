// Disable console logs in production or when needed
// To enable logs again, simply comment out this file import

const ENABLE_LOGS = false; // Set to true to enable console logs

if (!ENABLE_LOGS) {
    console.log = () => { };
    console.debug = () => { };
    console.info = () => { };
    // Keep console.warn and console.error enabled for important messages
}

export { };
