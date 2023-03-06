import { createContactItem, createContactItemByType } from './createContacts.js';
import { svgChange, svgDelete, svgSpiner } from './svg.js';
import { deleteClient } from './clientsApi.js';
import { modalTransform, render } from './main.js';

// текущий ID клиента
let currentId;

// получение элементов
export const tableBody = document.getElementById('tbody'),
    body = document.getElementById('body'),
    modal = document.getElementById('modal'),
    btnAdd = document.getElementById('add-client'),
    modalClose = document.getElementById('close'),
    modalTitle = document.getElementById('modal-title'),
    modalSurname = document.getElementById('modal-surname'),
    modalName = document.getElementById('modal-name'),
    modalLastname = document.getElementById('modal-lastname'),
    modalAdd = document.getElementById('modal-add'),
    modalSave = document.getElementById('modal-save'),
    modalCancel = document.getElementById('modal-cancel'),
    modalForm = document.getElementById('modal-form'),
    modalContacts = document.getElementById('modal-contacts'),
    modalDeleteBlock = document.getElementById('modal-delete'),
    modalConfirum = document.getElementById('modal-confirum'),
    modalNotConfirum = document.getElementById('modal-not-confirum'),
    modalId = document.getElementById('modal-id'),
    modalDeleteClient = document.getElementById('modal-del');

// добавление клиента в таблицу
export const addClient = function addClient(client) {
    let clientInfo = document.createElement('tr');
    let clientId = document.createElement('td');
    let clientFIO = document.createElement('td');
    let clientCreate = document.createElement('td');
    let clientDateCreate = document.createElement('span');
    let clientTimeCreate = document.createElement('span');
    let clientChange = document.createElement('td');
    let clientDateChange = document.createElement('span');
    let clientTimeChange = document.createElement('span');
    let clientContacts = document.createElement('td');
    let clientActions = document.createElement('td');
    let btnChange = document.createElement('button');
    let btnDelete = document.createElement('button');

    clientInfo.classList.add('client');
    clientId.classList.add('client__info');
    clientFIO.classList.add('client__info');
    clientCreate.classList.add('client__info');
    clientChange.classList.add('client__info');
    clientDateCreate.classList.add('client__date');
    clientDateChange.classList.add('client__date');
    clientTimeCreate.classList.add('client__time');
    clientTimeChange.classList.add('client__time');
    clientContacts.classList.add('client__info', 'flex');
    clientActions.classList.add('client__info');
    btnChange.classList.add('btn-reset', 'btn__actions', 'btn__actions--change');
    btnDelete.classList.add('btn-reset', 'btn__actions', 'btn__actions--delete');

    clientInfo.dataset.id = client.id;

    // ФИО клиета
    function getfio(client) {
        return client.surname + ' ' + client.name + ' ' + client.lastName;
    };

    // преобразование даты к понятному виду
    function dateFormat(client) {
        const newDate = new Date(client);
        const correct = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        const result = newDate.toLocaleString('ru', correct);
        return result;
    };

    // преобразование времени к понятному виду
    function timeFormat(client) {
        const newDate = new Date(client);
        const correct = {
            hour: 'numeric',
            minute: 'numeric',
        };
        const result = newDate.toLocaleString('ru', correct);
        return result;
    };

    for (const contact of client.contacts) {
        createContactItemByType(contact.type, contact.value, clientContacts);
    };

    clientId.textContent = client.id.substr(3, 6);
    clientFIO.textContent = getfio(client);
    clientDateCreate.textContent = dateFormat(client.createdAt);
    clientDateChange.textContent = dateFormat(client.updatedAt);
    clientTimeCreate.textContent = timeFormat(client.createdAt);
    clientTimeChange.textContent = timeFormat(client.updatedAt);
    btnChange.innerHTML = svgChange + svgSpiner + 'Изменить';
    btnDelete.innerHTML = svgDelete + svgSpiner + 'Удалить';

    btnChange.children[1].classList.add('none');
    btnDelete.children[1].classList.add('none');

    clientCreate.append(clientDateCreate, clientTimeCreate);
    clientChange.append(clientDateChange, clientTimeChange);
    clientActions.append(btnChange);
    clientActions.append(btnDelete);
    clientInfo.append(clientId);
    clientInfo.append(clientFIO);
    clientInfo.append(clientCreate);
    clientInfo.append(clientChange);
    clientInfo.append(clientContacts);
    clientInfo.append(clientActions);

    // обработчик кнопки изменить
    btnChange.addEventListener('click', () => {
        modalTransform();
        currentId = client.id;
        btnChange.children[0].classList.toggle('none');
        btnChange.children[1].classList.toggle('none');

        setTimeout(() => {
            modal.classList.add('modal--active');
            body.classList.add('body--passive');
            modalTitle.textContent = 'Изменить данные';
            modalId.textContent = 'ID: ' + client.id;
            modalSurname.value = client.surname;
            modalName.value = client.name;
            modalLastname.value = client.lastName;
            modalCancel.classList.add('none');
            modalDeleteClient.classList.remove('none');
            btnChange.children[0].classList.toggle('none');
            btnChange.children[1].classList.toggle('none');
        }, 1500);

        let clientContacts = client.contacts;
        for (const contactItem of clientContacts) {
            modalContacts.prepend(createContactItem(contactItem).contact);
            if (clientContacts.length > 5) {
                modal.children[0].style.overflowy = 'scroll';
            };

            if (clientContacts.length === 10) {
                modalAdd.classList.remove('modal__add--active');
            };
        };
    });

    // обработчик кнопки 'удалить'
    btnDelete.addEventListener('click', (e) => {
        e.preventDefault()
        currentId = client.id;
        btnDelete.children[0].classList.toggle('none');
        btnDelete.children[1].classList.toggle('none');
        setTimeout(() => {
            deleteThisClient()
        }, 1500);
    });

    return clientInfo
};

// обработчик кнопки 'удалить клиента' в модальном окне изменения 
modalDeleteClient.addEventListener('click', deleteThisClient);

// удаление клиента по текущему ID
async function deleteConfirum(id) {
    modalTransform();
    await deleteClient(id);
    await render();
}

// преобразование модального окна 
function deleteThisClient() {
    modalTransform();
    modal.classList.add('modal--active');
    body.classList.add('body--passive');
    modalTitle.textContent = 'Удалить';
    modalTitle.classList.add('center');
    modalForm.classList.add('none');
    modalDeleteBlock.classList.add('display');
}

// обработчик кнопки 'удалить' в модальном окне (окончательно)
modalConfirum.addEventListener('click', (e) => {
    e.preventDefault()
    deleteConfirum(currentId)
})

// обработчик кнопки  'отмена' 
modalNotConfirum.addEventListener('click', modalTransform);










