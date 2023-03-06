import {
    addClient,
    tableBody,
    body,
    modal,
    btnAdd,
    modalClose,
    modalTitle,
    modalLastname,
    modalSurname,
    modalName,
    modalAdd,
    modalCancel,
    modalForm,
    modalContacts,
    modalId,
    modalDeleteClient,
    modalDeleteBlock
} from './addClients.js';
import { createClient, editClient, getClients } from './clientsApi.js';
import { createContactItem } from './createContacts.js';
import { preloader } from './preloader.js';
import { validationForm, errorName, errorSurname, validationContact, errorContact, errorContactTel } from './validation.js';


// отрисовка таблицы
export async function render() {
    tableBody.append(preloader());

    const clients = await getClients();

    let clientsCopy = [...clients];

    for (const client of clientsCopy) {
        client.fullName = client.surname + client.name + client.lastName;
    };

    clientsCopy = sortClients(clientsCopy, column, columnDir);
    clientsCopy = filterClients(clientsCopy, 'fullName', input.value);

    setTimeout(() => {
        tableBody.innerHTML = '';

        for (const client of clientsCopy) {

            tableBody.append(addClient(client));
        };
    }, 1500);

};

//обрботчик кнопки добавит клиента
btnAdd.addEventListener('click', openModal);

// открытие модального окна
function openModal() {
    modalTransform();
    modalTitle.textContent = 'Новый клиент';
    modal.classList.add('modal--active');
    body.classList.add('body--passive');
    modalAdd.classList.add('modal__add--active');
    modalCancel.classList.remove('none');
    modalDeleteClient.classList.add('none');
}

// обработчик кнопки добавить контакт
modalAdd.addEventListener('click', (e) => {
    e.preventDefault();
    contactsAdd()
})

// обработчик кнопки закрыть (кристик в правом верънем углу)
modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    modalTransform()
})

// обработчик кнопки отмена
modalCancel.addEventListener('click', (e) => {
    e.preventDefault();
    modalTransform()
})

// обработчик кнопки сохранить
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveClient()
})

// добавление контактов в модальное окно
function contactsAdd() {
    const contactsItem = document.getElementsByClassName('contact');

    if (contactsItem.length >= 0) {
        modalContacts.classList.add('modal__contacts--full');
    };

    function eventThis() {
        const contactItem = createContactItem();
        modalContacts.append(contactItem.contact);
    };

    if (contactsItem.length < 9) {
        eventThis();
        if (contactsItem.length > 5) {
            modal.children[0].style.overflowy = 'scroll';
        } else modal.children[0].style.overflowy = 'hidden';
    } else {
        eventThis();
        modalAdd.classList.remove('modal__add--active');
    };
}


// сохрвнение данных
async function saveClient() {
    if (validationForm()) {
        if (validationContact()) {
            setTimeout(() => {
                modalTransform();
            }, 1500);
            await sendClient();
            await render();

            document.querySelector('.save__spiner').classList.toggle('none');
        };
    } else return;
}

// преобразование модального окна к начальному виду
export function modalTransform() {
    modal.classList.remove('modal--active');
    body.classList.remove('body--passive');
    modalForm.classList.remove('none');
    modalDeleteBlock.classList.remove('display');
    modalTitle.classList.remove('center');
    modalAdd.classList.add('modal__add--active');
    modalContacts.classList.remove('modal__contacts--full');
    errorName.classList.add('none');
    errorSurname.classList.add('none');
    errorContact.classList.add('none');
    errorContactTel.classList.add('none');
    document.querySelector('.save__spiner').classList.add('none');
    const btnActions = document.querySelectorAll('.btn__actions');

    for (const element of btnActions) {
        element.children[1].classList.add('none');
        element.children[0].classList.remove('none');

    };

    modalSurname.style.borderColor = '#C8C5D1';
    modalName.style.borderColor = '#C8C5D1';

    modalName.value = '';
    modalSurname.value = '';
    modalLastname.value = '';
    modalId.textContent = '';
    let contactDiv = document.querySelectorAll('.contact');
    for (const div of contactDiv) {
        div.remove();
    };
};

// отправка данных клиента на сервер
async function sendClient() {

    const contactTypes = document.querySelectorAll('.contacts__name');
    const contactValues = document.querySelectorAll('.contacts__input');
    let contacts = [];

    for (let i = 0; i < contactTypes.length; i++) {
        contacts.push({
            type: contactTypes[i].innerHTML,
            value: contactValues[i].value
        });
    };

    let client = {};
    client.name = modalName.value;
    client.surname = modalSurname.value;
    client.lastName = modalLastname.value;
    client.contacts = contacts;

    if (modalId.textContent === '') {
        await createClient(client);
    } else {
        let id = modalId.textContent.substring(4);
        await editClient(client, id);
    };

};



// сортировка массива клиентов
function sortClients(arr, prop, dir) {
    const clientsCopy = [...arr];
    return clientsCopy.sort(function (clientA, clientB) {
        if ((!dir == false ? clientA[prop] < clientB[prop] : clientA[prop] > clientB[prop]))
            return -1;
    });
};

// сортировка по ID
const listId = document.querySelector('.sort__id');
listId.addEventListener('click', () => sort(listId));

// сортировка по ФИО
const listFio = document.querySelector('.sort__fio');
listFio.addEventListener('click', () => {
    document.querySelectorAll('.sort__letter').forEach(e => {
        e.classList.toggle('sort__letter--active');
    });
    sort(listFio);
});

// сортировка по дате создания
const listCreate = document.querySelector('.sort__create');
listCreate.addEventListener('click', () => sort(listCreate));

// сортировка по дате изменения
const listChange = document.querySelector('.sort__change');
listChange.addEventListener('click', () => sort(listChange));



// отрисовка после сортировки
let column = 'id';
let columnDir = true;
function sort(th) {
    th.children[0].classList.toggle('arrow--up');
    column = th.dataset.column;
    columnDir = !columnDir;
    render();
};



// фильтр массива клиентов
function filterClients(arr, prop, value) {
    let resultFilter = [];
    let clientsCopy = [...arr];
    for (let item of clientsCopy) {
        if (String(item[prop]).toLowerCase().includes(String(value).toLowerCase())) {
            resultFilter.push(item);
        };
    };
    return resultFilter;
};

// отрисовка после фильтрации
const input = document.getElementById('input');
input.addEventListener('input', render);


// первая отрисовка
render();



