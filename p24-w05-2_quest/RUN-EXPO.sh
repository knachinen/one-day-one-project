#!/bin/bash

# Quest MVP - Expo 실행 스크립트

echo "🧹 Cleaning all caches..."
cd "$(dirname "$0")/mobile"

# Remove all cache directories
rm -rf .expo
rm -rf node_modules/.cache
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*

# Clear watchman
watchman watch-del-all 2>/dev/null || true

echo ""
echo "✅ Cache cleared!"
echo ""
echo "🚀 Starting Expo..."
echo ""

npx expo start --clear

echo ""
echo "💡 If you still get errors, try:"
echo "   1. Close this terminal"
echo "   2. Open a new terminal"
echo "   3. cd mobile"
echo "   4. npx expo start --clear"
