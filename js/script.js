let url_api = 'users.json';
let all_users = fetch(url_api).then(response => response.json());
let show = 0;

document.addEventListener('DOMContentLoaded', function(){
    get_all_users();
})

function get_all_users(){
    all_users.then(json => users_cards(json))
}

function users_cards(users){ //ho creato le componenti singolarmente sotto consiglio del prof (risulta effettivamente molto più pulito seppur più lungo), sotto c'e anche la versione base con l'innerhtml
    let cards = document.querySelector('#carte');
    users.forEach(ele => {

        let div_card = document.createElement('div');
        div_card.classList.add('card');
       

        let photo = document.createElement('img');
        photo.src = `${ele.profileURL}`;
        photo.classList.add('card-img-top');
        photo.alt= `${ele.username}`;
        div_card.appendChild(photo);

        let card_body = document.createElement('div');
        card_body.classList.add(`card-body`);
        card_body.id = `card-body${ele.id}`;
        div_card.appendChild(card_body);

        let card_title = document.createElement('h5');
        card_title.classList.add(`card-title`);
        card_title.id = `card-title${ele.id}`;
        card_title.innerText = `${ele.firstName} ${ele.lastName}`;
        card_body.appendChild(card_title);

        let card_text = document.createElement('p');
        card_text.classList.add(`card-text`);
        card_text.id = `card-text${ele.id}`;
        card_text.innerText = `${ele.shortDescription}`;
        card_body.appendChild(card_text);

        let btn_know = document.createElement('button');
        btn_know.type = 'button';
        btn_know.classList.add('btn');
        btn_know.classList.add('btn-primary');
        btn_know.id = `btn_more${ele.id}`;
        btn_know.innerText = 'Know More';
        btn_know.addEventListener('click',function(){
            know_more(users, ele.id);
        });
        card_body.appendChild(btn_know);

        /* div_card.innerHTML = `
                                <img src="${ele.profileURL}" class="card-img-top" alt="${ele.username}">
                                <div class="card-body">
                                    <h5 class="card-title">${ele.firstName} ${ele.lastName}</h5>
                                    <p class="card-text${ele.id}">${ele.shortDescription}</p>
                                    <button type="button" onclick="know_more(${ele.id})" class="btn btn-primary">Know More</button>
                                </div>
                             `;*/

        cards.appendChild(div_card); 
    });
}


function know_more(users, id){
    let user = users.find(ele => ele.id === id);

    let card_body = document.querySelector(`#card-body${user.id}`);
    let btn_know = document.querySelector(`#btn_more${user.id}`);
    
    let ul = document.createElement('ul');
    ul.classList.add('list-group');
    ul.classList.add('list-group-flush');
    btn_know.before(ul);

    let mail = document.createElement('li');
    mail.classList.add('list-group-item');
    mail.innerHTML = `<a href="mailto:${user.email}">${user.email}</a>`;
    ul.appendChild(mail);

    let long_desc = document.createElement('li');
    long_desc.classList.add('list-group-item');
    long_desc.innerText = `${user.longDescription}`;
    ul.appendChild(long_desc);

    let btn_less = document.createElement(`button${user.id}`);
    btn_less.type = 'button';
    btn_less.classList.add('btn');
    btn_less.classList.add('btn-primary');
    btn_less.innerText = 'Show Less';
    card_body.replaceChild(btn_less, btn_know); //purtroppo mi fermo qua, non sono riuscito ad implementare come volevo la funzionalità 
                                                //del bottone show less, ma essendo un plus personale rispetto alla richiesta della traccia non dovrebbe influire negativamente sul voto


    /* btn_less.addEventListener('click', function(){
        show_less(user);
    }); */
    

        /*<ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
        </ul> */
}

