const rp = require('request-promise');

function forecast(req, res, next) {
  console.log(req.query);
  rp({
    method: 'GET',
    url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${req.query.lat},${req.query.lng}`,
    qs: {
      units: 'si'
    },
    json: true
  })
    .then(response => res.json(response.currently))
    .catch(next);

}

module.exports = { forecast };
