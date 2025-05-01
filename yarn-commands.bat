@echo off
IF "%1"=="" (
  echo Usage: yarn-commands [command]
  echo Example: yarn-commands dev
  exit /b
)

IF "%1"=="dev" (
  npm run dev
  exit /b
)

IF "%1"=="build" (
  npm run build
  exit /b
)

IF "%1"=="start" (
  npm run start
  exit /b
)

IF "%1"=="lint" (
  npm run lint
  exit /b
)

IF "%1"=="add" (
  npm install %2
  exit /b
)

IF "%1"=="remove" (
  npm uninstall %2
  exit /b
)

echo Unknown command: %1
echo Available commands: dev, build, start, lint, add, remove
