(function() {
    'use strict';
    let form = document.getElementById('form');

    function request(url) {
        return fetch(url).then(response => response.json());
    }

    function change_results_content(result, element) {
        let li = "";
        li = result.reduce((movies, movie) => {
            return movies + `<li>${movie}</li>`;
        }, li);
        element.innerHTML = li;
    }

    function get_results() {
        let movies_knn = document.getElementById('movies_knn');
        let movies_svd = document.getElementById('movies_svd');

        request(`/api/results?uid=${form.user.value}`).then(data => {
            change_results_content(data.result_knn, movies_knn);
            change_results_content(data.result_svd, movies_svd);
        });
        return false;
    }


    (function main() {
        form.onsubmit = get_results;
        request('/api/users').then(data => {
            let usersSelect = document.getElementById('users');
            let options = usersSelect.innerHTML;
            options = data.users_id.reduce((options, userId) => {
                return options + `<option value=${userId}>${userId}</option>`;
            }, options);

            usersSelect.innerHTML = options;
        });
    })();
})();