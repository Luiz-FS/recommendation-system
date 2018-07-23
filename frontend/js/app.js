(function() {
    'use strict';
    const form = document.getElementById('form');

    function request(url) {
        return fetch(url).then(response => response.json());
    }

    function change_list_content(list, element) {
        let li = "";
        li = list.reduce((elements, value) => {
            return elements + `<li>${value}</li>`;
        }, li);
        element.innerHTML = li;
    }

    function change_explication_content(neighbors) {
        const explication_text = document.getElementById('explication_text');
        const neighbors_element = document.getElementById('neighbors');
        const explication = "Você recebeu essas recomendações de filmes de acordo"
                        + "com a nota que outros usuários que tem um perfis"
                        + "similares a seu atribuiram a filme. "
                        + "Os filmes recomendados tem as maiores notas"
                        + "atribuidas por estes usuários."
                        + "Os 5 usuários com perfís mais similares estão listados abaixo:";
        
        explication_text.innerText = explication;
        change_list_content(neighbors, neighbors_element);
    }

    function get_results() {
        const movies_knn = document.getElementById('movies_knn');
        const movies_svd = document.getElementById('movies_svd');

        request(`/api/results?uid=${form.user.value}`).then(data => {
            change_list_content(data.result_knn, movies_knn);
            change_list_content(data.result_svd, movies_svd);
            change_explication_content(data.neighbors);
        });
        return false;
    }


    (function main() {
        form.onsubmit = get_results;
        request('/api/users').then(data => {
            const usersSelect = document.getElementById('users');
            let options = usersSelect.innerHTML;
            options = data.users_id.reduce((options, userId) => {
                return options + `<option value=${userId}>${userId}</option>`;
            }, options);

            usersSelect.innerHTML = options;
        });
    })();
})();