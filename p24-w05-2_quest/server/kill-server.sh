#!/bin/bash

# Kill any process using port 3000

echo "🔍 Checking for processes on port 3000..."

PID=$(lsof -t -i :3000)

if [ -z "$PID" ]; then
  echo "✅ No process found on port 3000"
  exit 0
fi

echo "🎯 Found process: $PID"
echo "⚠️  Killing process..."

kill -9 $PID

if [ $? -eq 0 ]; then
  echo "✅ Process killed successfully"
  echo "🚀 You can now start the server with: npm run dev"
else
  echo "❌ Failed to kill process"
  echo "💡 Try running with sudo: sudo ./kill-server.sh"
  exit 1
fi
