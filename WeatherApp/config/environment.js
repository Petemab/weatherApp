const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev';
// const dbURI = process.env.MONGODB_URI || `mongodb://localhost/WeatherApp-${env}`;
// const secret = process.env.SECRET || 'not clever, not funny@@@@££££';

module.exports = { port, env};
