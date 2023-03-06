import { modalSurname, modalName, modalLastname } from "./addClients.js";

// получение элементов
export const errorSurname = document.getElementById('error-surname'),
    errorName = document.getElementById('error-name'),
    errorLastname = document.getElementById('error-lastname'),
    errorContactTel = document.getElementById('error-contact-tel'),
    errorContact = document.getElementById('error-contact');


// проверка на валидность ФИО клиента   
export const validationForm = () => {
    const onlyValid = /[^а-яА-ЯёЁ]+$/g;
    modalSurname.addEventListener('input', () => {
        errorSurname.classList.add('none');
        modalSurname.style.borderColor = '#C8C5D1';
    });

    modalName.addEventListener('input', () => {
        errorName.classList.add('none');
        modalName.style.borderColor = '#C8C5D1';
    });

    modalLastname.addEventListener('input', () => {
        errorLastname.classList.add('none');
        modalLastname.style.borderColor = '#C8C5D1';
    });

    if (!modalSurname.value || onlyValid.test(modalSurname.value)) {
        modalSurname.style.borderColor = '#F06A4D';
        errorSurname.classList.remove('none');
        return false;
    };

    if (!modalName.value || onlyValid.test(modalName.value)) {
        modalName.style.borderColor = '#F06A4D';
        errorName.classList.remove('none');
        return false;
    };

    if (onlyValid.test(modalLastname.value)) {
        modalLastname.style.borderColor = '#F06A4D';
        errorLastname.classList.remove('none');
        return false;
    };

    return true;
};

// проверка на валидность контактов
export const validationContact = () => {
    const contactsInput = document.querySelectorAll('.contacts__input'),
        onlyNumbers = /[^0-9]+$/g,
        onlyEmail = /[^0-9a-zA-Z|@|.]+$/g;

    for (const input of contactsInput) {
        input.addEventListener('input', () => {
            errorContact.classList.add('none');
            errorContactTel.classList.add('none');
            input.style.borderColor = '#C8C5D1';

        });
        let inputName = input.parentElement.children[0].children[0].innerHTML;

        function errorContactValue() {
            errorContact.classList.remove('none');
            input.style.borderColor = '#F06A4D';
        };

        switch (inputName) {
            case 'Телефон':
                if (!input.value || onlyNumbers.test(input.value) || input.value.length !== 11) {
                    errorContactValue()
                    errorContactTel.classList.remove('none');
                    return false;
                };
            case 'Доп. телефон':
                if (!input.value || onlyNumbers.test(input.value)) {
                    errorContactValue();
                    return false;
                };
            case 'Email':
                if (!input.value || onlyEmail.test(input.value)) {
                    errorContactValue();
                    return false;
                };
            case 'VK':
                if (!input.value) {
                    errorContactValue();
                    return false;
                };
            case 'FaceBook':
                if (!input.value) {
                    errorContactValue();
                    return false;
                };
            default:
                break;
        };

    };

    return true;

};