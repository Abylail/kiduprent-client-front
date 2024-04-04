module.exports = {
  apps: [
    {
      name: 'rent',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: '.output/server/index.mjs'
    }
  ]
}
