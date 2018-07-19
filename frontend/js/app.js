function request(url) {
    return fetch(url).then(response => response.json());
}

function get_results(event) {
    let relateds = document.getElementById('relateds');
    relateds.innerText = "Deu certo";
    console.log(form.action);
    console.log(event)
    return false;
}

let form = document.getElementById('form');

//form.onsubmit = get_results;

let usersSelect = document.getElementById('users');

request('/api/users').then(data => {
    options = usersSelect.innerHTML;
    options = data.users_id.reduce((options, userId) => {
        return options + `<option value=${userId}>${userId}</option>`
    }, options);

    usersSelect.innerHTML = options;
});