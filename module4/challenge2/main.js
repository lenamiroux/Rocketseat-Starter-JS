var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var containerElement = document.querySelector('#container');

inputElement.focus();

buttonElement.onclick = function renderList() {
  var username = inputElement.value;

  axios
    .get('https://api.github.com/users/' + username + '/repos')
    .then(function (response) {
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
      console.warn(error);
    });
};
