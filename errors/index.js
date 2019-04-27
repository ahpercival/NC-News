const errorMSG = require('./error-msg')

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handleCustomErrors = (err, req, res, next) => {

  if (errorMSG[404][err.code]) {
    res.status(404).send({ msg: errorMSG[404][err.code] });
  }

  if (errorMSG[400][err.code]) {
    res.status(400).send({ msg: errorMSG[400][err.code] });
  }

  else {
    next(err);
  }

}

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};