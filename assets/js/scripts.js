let listUsers = [];
let listUsersNew = [];

window.addEventListener("load", async () => {
    listUsersNew = await fetch(
        "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
    )
        .then((users) => users.json())
        .then((users) => {
            listUsers = users.results.map((user) => {
                return {
                    userName: `${user.name.first} ${user.name.last}`,
                    gender: user.gender,
                    age: user.dob.age,
                    picture: user.picture.thumbnail,
                };
            });
            return listUsers;
        });

    inputTextSearch = document.querySelector("#idSearch");
    btnSearch = document.querySelector("#btnSearch");

    btnSearch.addEventListener("click", () => {
        searchUsers(inputTextSearch.value);
    });

    inputTextSearch.addEventListener("keyup", () => {
        if (event.key == "Enter") {
            searchUsers(event.srcElement.value.toLowerCase());
        }
        event.srcElement.value;
    });
});

function searchUsers(text) {
    document.querySelector("#divUsers").innerHTML = "";
    document.querySelector("#divEstatistica").innerHTML = "";

    let resultFindUsers = listUsers.filter((user) => {
        if (user.userName.toLowerCase().indexOf(text) !== -1) {
            return user;
        }
    });

    const totalUsers = resultFindUsers.length;

    if (totalUsers === 0) {
        document.querySelector("#divUsers").innerHTML = `
        <ul class="collection">
            <li class="collection-item">
                Nenhum usuário filtrado
            </li>
        </ul>
        `;
        document.querySelector("#divEstatistica").innerHTML = `
        <ul class="collection">
            <li class="collection-item">
                Nada a ser exibido.
            </li>
        </ul>
        `;
        return true;
    }

    let conteudo = `
    <ul class="collection">
        <li class="center">
            <h2>${totalUsers} usuário(s) encontrado(s)</h2>
        </li>`;


    let sumGenderMale = 0;
    let sumGenderFemale = 0;
    let sumAge = 0;

    resultFindUsers.forEach((user) => {

        if (user.gender === 'female') {
            sumGenderFemale++;
        } else {
            sumGenderMale++;
        }

        sumAge += user.age;

        conteudo += `
        <li class="collection-item avatar">
            <img
                src="${user.picture}"
                alt="${user.userName}"
                class="circle"
            />
            <span class="title left">${user.userName}, ${user.age} anos</span>
        </li>`;
    });

    conteudo += "</ul>";

    document.querySelector("#divUsers").innerHTML = conteudo;

    totalAge = resultFindUsers.reduce((accumulator, user) => {
        return accumulator +user.age
    }, 0);

    let mediumAge = (sumAge / totalUsers).toFixed(2);

    document.querySelector("#divEstatistica").innerHTML = `
    <ul class="collection">
        <li class="center">
            <h2>Estatísticas</h2>
        </li>
        <li class="collection-item">
            <div class="left left-align">
                <p class="title">
                    Sexo Masculino: <span>${sumGenderMale}</span>
                </p>
                <p class="title">
                    Sexo Feminino: <span>${sumGenderFemale}</span>
                </p>
                <p class="title">
                    Soma das idades: <span>${totalAge}</span>
                </p>
                <p class="title">
                    Média das idades: <span>${mediumAge}</span>
                </p>
            </div>
        </li>
    </ul>`;


    //console.log(resultFindUsers);
    return true;

}
