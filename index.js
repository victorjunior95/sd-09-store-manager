// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  console.log('Iniciando Projeto')
  response.send();
});
