# Smart Utility Toolkit

Node.js core modules practice - Lab Assignment 1

## Files
- calculator.js - CLI calculator using process.argv
- modules/isEven.js - custom module to check even numbers
- modules/logger.js - custom module for timestamped logs
- app.js - uses isEven and logger modules together
- server.js - basic HTTP server with routes /, /about, /contact
- fileManager.js - file CRUD operations using fs module
- dice.js - random dice roll generator using crypto module

## How to run

Calculator:
node calculator.js add 10 5
node calculator.js sub 20 8
node calculator.js mul 4 5
node calculator.js div 10 2

Module reuse demo:
node app.js

HTTP server:
node server.js
then open http://localhost:3000, /about, /contact in browser

File manager:
node fileManager.js

Dice generator:
node dice.js 5
