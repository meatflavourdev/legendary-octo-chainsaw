// In your index.js

const { backup, backups, initializeApp } = require('firestore-export-import')
const serviceAccount = require('./serviceAccountKey.json')

// Initiate Firebase App
// appName is optional, you can omit it.
const appName = '[DEFAULT]'
initializeApp(serviceAccount, appName)

// Start exporting your data
backup('collection-name', options).then((data) =>
  console.log(JSON.stringify(data))
)