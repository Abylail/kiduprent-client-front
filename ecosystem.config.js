module.exports = {
  apps: [
    {
      name: 'client',
      exec_mode: 'cluster',
      instances: 2, // Or a number of instances
      script: '.output/server/index.mjs'
    }
  ]
}
