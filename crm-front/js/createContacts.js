import { modalContacts } from "./addClients.js";
import { svgContactDelete, svgEmail, svgFb, svgOther, svgPhone, svgVk } from "./svg.js";
import { errorContact } from "./validation.js";

// создание контакта
export const createContactItem = (contactItem = '') => {
    const contact = document.createElement('div');
    const contactType = document.createElement('div');
    const contactName = document.createElement('button');
    const contactList = document.createElement('ul');
    const contactPhone = document.createElement('li');
    const contactVk = document.createElement('li');
    const contactFb = document.createElement('li');
    const contactEmail = document.createElement('li');
    const contactOther = document.createElement('li');
    const contactInput = document.createElement('input');
    const contactDelete = document.createElement('button');
    const contactDeleteTooltip = document.createElement('span');

    contact.classList.add('contact');
    contactDeleteTooltip.classList.add('contacts__tooltip', 'tooltip');
    contactType.classList.add('contacts__type');
    contactName.classList.add('contacts__name');
    contactList.classList.add('contacts__list', 'list-reset');
    contactPhone.classList.add('contacts__item');
    contactVk.classList.add('contacts__item');
    contactFb.classList.add('contacts__item');
    contactEmail.classList.add('contacts__item');
    contactOther.classList.add('contacts__item');
    contactInput.classList.add('contacts__input');
    contactDelete.classList.add('btn-reset', 'contacts__delete');

    contactName.textContent = 'Телефон';
    contactDeleteTooltip.textContent = 'Удалить контакт';
    contactPhone.textContent = 'Телефон';
    contactVk.textContent = 'VK';
    contactFb.textContent = 'FaceBook';
    contactEmail.textContent = 'Email';
    contactOther.textContent = 'Доп. телефон';
    contactInput.placeholder = 'Введите данные контакта';
    contactInput.type = 'text';
    contactDelete.innerHTML = svgContactDelete;

    // обработчик кнопки удалить контакт (крестик справа от контакта)
    contactDelete.addEventListener('click', (e) => {
        e.preventDefault();
        contact.remove();
        errorContact.classList.add('none');
        document.getElementById('modal-add').classList.add('modal__add--active');
        const contactsItem = document.querySelectorAll('.contact');
        if (contactsItem.length === 0) {
            modalContacts.classList.remove('modal__contacts--full');
        };
    });

    // обработчик кнопки выбора типа контакта
    contactName.addEventListener('click', (e) => {
        e.preventDefault();
        contactList.classList.toggle('contacts__list--active');
        contactName.classList.toggle('contacts__list--active');
    });

    const setType = (type) => {
        type.addEventListener('click', () => {
            let itemList = document.querySelectorAll('.contacts__item');
            contactName.textContent = type.textContent;
            for (const item of itemList) {
                item.classList.remove('none');
                if (item.textContent == contactName.textContent) {
                    item.classList.add('none');
                };
            };

            contactList.classList.remove('contacts__list--active');
            contactName.classList.remove('contacts__list--active');
        });
    };

    const arrayTypes = [contactPhone, contactVk, contactFb, contactEmail, contactOther];

    for (const type of arrayTypes) {
        setType(type);
    };

    contactPhone.classList.add('none');

    contactDelete.append(contactDeleteTooltip);
    contactList.append(contactPhone, contactEmail, contactVk, contactFb, contactOther);
    contactType.append(contactName, contactList);
    contact.append(contactType, contactInput, contactDelete);


    if (contactItem !== '') {

        contactName.textContent = contactItem.type;
        contactInput.value = contactItem.value;
        modalContacts.classList.add('modal__contacts--full');
    };

    return {
        contact,
        contactName,
        contactInput,
        contactDelete
    };
};

// создание сылки, иконки и тултипа для контакта
const contactLink = (type, value, elem, svg, item) => {
    elem = document.createElement('a');
    const tooltip = document.createElement('div');
    const tooltipType = document.createElement('span');
    const tooltipValue = document.createElement('a');

    elem.classList.add('contacts__link');
    tooltip.classList.add('tooltip');
    tooltipType.classList.add('tooltip__type');
    tooltipValue.classList.add('tooltip__value');

    elem.innerHTML = svg;
    tooltipType.textContent = type + ': ';
    tooltipValue.textContent = value;

    tooltip.append(tooltipType, tooltipValue);

    if (type === 'Телефон' || type === 'Доп. телефон') {
        elem.href = `tel:${value.trim()}`;
        tooltipValue.style.color = '#fff';
        tooltipValue.style.textDecoration = 'none';
        tooltipType.textContent = '';
    } else if (type === 'Email') {
        elem.href = `mailto:${value.trim()}`;
    } else {
        elem.href = value.trim();
    };

    elem.append(tooltip);
    item.append(elem);
};

// присвоеие иконки в зависимости от типа контакта
export const createContactItemByType = (type, value, item) => {
    switch (type) {
        case 'Телефон':
            let phone;
            contactLink(type, value, phone, svgPhone, item);
            break;
        case 'VK':
            let vk;
            contactLink(type, value, vk, svgVk, item);
            break;
        case 'FaceBook':
            let fb;
            contactLink(type, value, fb, svgFb, item);
            break;
        case 'Email':
            let email;
            contactLink(type, value, email, svgEmail, item);
            break;
        case 'Доп. телефон':
            let other;
            contactLink(type, value, other, svgOther, item);
            break;

        default:
            break;
    };
};

