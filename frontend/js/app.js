function request(url) {
    return fetch(url).then(response => response.json());
}

let form = document.getElementById('form');

function get_results(event) {
    let results = document.getElementById('results');

    request('/api/results' + `?uid=${form.user.value}`).then(data => {
        let li = "";
        li = data.result.reduce((movies, movie) => {
            return movies + `<li>${movie}</li>`
        }, li);
        results.innerHTML = li;
    });
    return false;
}

//form.onsubmit = get_results;

let usersSelect = document.getElementById('users');

request('/api/users').then(data => {
    options = usersSelect.innerHTML;
    options = data.users_id.reduce((options, userId) => {
        return options + `<option value=${userId}>${userId}</option>`
    }, options);

    usersSelect.innerHTML = options;
});