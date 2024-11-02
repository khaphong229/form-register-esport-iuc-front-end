const URL_SERVER =
  process.env.BUILD_MODE === 'production' ? 'https://esport-iuc-api.onrender.com' : 'http://localhost:3456'

console.log('URL Server:', URL_SERVER)

export default URL_SERVER
