module.exports = {
  apps: [
    {
      name: 'client',
      exec_mode: 'cluster',
      instances: 2, // Or a number of instances
      script: 'node .output/server/index.mjs'
    }
  ]
}
