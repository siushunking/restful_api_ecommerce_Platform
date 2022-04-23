exports.get404 = (req, res, next) => {
    res.status(404).then(res.send('404'))
  };
  