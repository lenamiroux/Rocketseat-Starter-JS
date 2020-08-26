var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var containerElement = document.querySelector('#container');

var loading = true;

inputElement.focus();

buttonElement.onclick = function renderList() {
  if (loading === true) {
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    li.style.listStyleType = 'none';
    var loadingMessage = document.createTextNode('Carregando...');
    li.appendChild(loadingMessage);
    ul.appendChild(li);
    containerElement.appendChild(ul);
  }

  var username = inputElement.value;

  axios
    .get('https://api.github.com/users/' + username + '/repos')
    .then(function (response) {
      loading = false;
      function createList(response) {
        containerElement.innerHTML = '';

        var ul = document.createElement('ul');
        var repos = response.data;

        for (const repo of repos) {
          var li = document.createElement('li');
          var liText = document.createTextNode(repo.name);

          li.appendChild(liText);
          ul.appendChild(li);
        }

        containerElement.appendChild(ul);
        inputElement.value = '';
        inputElement.focus();
      }
      createList(response);
    })
    .catch(function (error) {
      loading = false;
      if (error.response.status === 404) {
        containerElement.innerHTML = '';
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        li.style.listStyleType = 'none';
        var errorMessage = document.createTextNode('Usuário não encontrado');
        li.appendChild(errorMessage);
        ul.appendChild(li);
        containerElement.appendChild(ul);
      }
    });
};
