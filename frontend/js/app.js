(function() {
    'use strict';
    const form = document.getElementById('form');

    function request(url) {
        return fetch(url).then(response => response.json());
    }

    function change_list_content(list, element) {
        const li = list.reduce((elements, value) => {
            return elements + `<li>${value}</li>`;
        }, "");
        element.innerHTML = li;
    }

    function change_explication_content(neighbors) {
        const explication_text = document.getElementById('explication_text');
        const neighbors_element = document.getElementById('neighbors');
        const explication = "Você recebeu essas recomendações de filmes de acordo "
                        + "com a nota que outros usuários que tem perfis "
                        + "similares a seu atribuiram a filme. "
                        + "Os filmes recomendados são os que possuem as maiores notas "
                        + "atribuidas por estes usuários. "
                        + "Os 5 usuários com perfis mais similares e seus respectivos "
                        + "graus de similaridade (O grau de similaridade foi calculado "
                        + "com base na distância do cosseno, esse valor varia de 0 a 1. "
                        + "0 para não similar e 1 para totalmente similar) estão listados abaixo:";
        
        explication_text.innerText = explication;
        change_list_content(neighbors, neighbors_element);
    }

    function change_rmse(rmse_data) {
        const rmse_knn = document.getElementById('rmse_knn');
        const rmse_svd = document.getElementById('rmse_svd');
        const obs = "\nOBS: O RMSE calculado é o global, que usa toda a base de treino e de teste para a avaliação";
        rmse_knn.innerText = `RMSE: ${rmse_data.rmse_knn}` + obs;
        rmse_svd.innerText = `RMSE: ${rmse_data.rmse_svd}` + obs;
    }

    function get_results() {
        const movies_knn = document.getElementById('movies_knn');
        const movies_svd = document.getElementById('movies_svd');

        request(`/api/results?uid=${form.user.value}`).then(data => {
            change_list_content(data.result_knn, movies_knn);
            change_list_content(data.result_svd, movies_svd);
            change_rmse(data.rmse);
            change_explication_content(data.neighbors);
        });
        return false;
    }


    (function main() {
        form.onsubmit = get_results;
        request('/api/users').then(data => {
            const usersSelect = document.getElementById('users');
            const options = data.users_id.reduce((options, userId) => {
                return options + `<option value=${userId}>${userId}</option>`;
            }, usersSelect.innerHTML);

            usersSelect.innerHTML = options;
        });
    })();
})();