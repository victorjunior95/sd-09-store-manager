exports.startServer = async (app) => {
  const DEFAULT_PORT = 3000;
  const PORT = process.env.PORT || DEFAULT_PORT;

  app.listen(PORT, (err) => {
    if (err) {
      return;
    }
    console.log(`Server is running... Listening on ${PORT}`);
  });
};
