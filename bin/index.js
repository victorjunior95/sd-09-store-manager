exports.startServer = async (app) => {
  const DEFAULT_PORT = 3000;
  const PORT = DEFAULT_PORT;

  const server = app.listen(PORT, (err) => {
    if (err) {
      return;
    }
    console.log(`Server is running... Listening on ${PORT}`);
  });
};

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Proces terminated');
  });
});
