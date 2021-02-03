let user;
let repos;
let shouldShowRepos = false;
let errorFound = false;

function main(){
  render();
  handleSubmitClick();
}
  
function render(){
  $('#form').html(generateFormPage());
  if(shouldShowRepos){
    $('#pics').html(generateDogPage());
  }
}
  
function generateFormPage(){
  return `<form id='repoForm'>
              <label>Whos repos would you like to see?</label>
              <input id='user' type='text' placeholder='tykrzyz' required='required'>
              <button type='submit'>Submit</button>
            </form>`;
}
  
function generateDogPage(){
  let html;
  if(errorFound){
    html = '<h2>Sorry! I couldn\'t find that user</h2>';
  }else{
    html = '<div class>';
    repos.forEach(repo => {
      html += `<h3>Name: ${repo.name}</h3><a href=${repo.html_url}>${repo.html_url}</a>`;
    });
    html += '</div>';
  }
  return html;
}

function handleSubmitClick(){
  $('main').on('submit', '#repoForm', e => {
    e.preventDefault();
    user = $('#user').val();
    if(user === ''){
      shouldShowRepos = false;
    } 
    else
      shouldShowRepos = true;
    getRepos();

  });
}

function getRepos(){
  fetch(`https://api.github.com/users/${user}/repos`).then(response => response.json()).then(responseJson => handleResponse(responseJson)).catch(error => console.log(error));
}
  
function handleResponse(response){
  if(response.status !== 'error'){
    repos = response.map(repo => {
      return {name: repo.name, html_url: repo.html_url};
    });
    errorFound = false;
  }
  else errorFound = true;
  console.log(errorFound);
  render();
  
}
  
$(main);