const router = require('express').Router();

const HTTP_OK = 200;

router.get('/', (_req, res) => {
  res.status(HTTP_OK).json({ message: 'NOT_IMPLEMENTED' });
});

module.exports = router;
