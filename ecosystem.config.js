module.exports = {
  apps : [{
    name   : "news-flow-client",
    script : "npm run preview",
    env_production : {
          NODE_ENV: "production"
    }
  }]
}

