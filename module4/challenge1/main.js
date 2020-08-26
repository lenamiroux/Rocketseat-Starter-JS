var checaIdade = function (idade) {
  return new Promise(function (resolve, reject) {
    if (idade >= 18) {
      resolve('Maior ou igual a 18');
    } else {
      reject('Menor que 18');
    }
  });
};

checaIdade(20)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
