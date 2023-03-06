const urlAdress = 'http://localhost:3000/api/clients/';

// получение дпнных с сервера
export const getClients = async () => {
    const response = await fetch(urlAdress, {
        method: 'GET'
    });
    const result = await response.json();
    return result;
};

// отправка новых данных на сервер
export const createClient = async (client) => {
    const response = await fetch(urlAdress, {
        method: 'POST',
        body: JSON.stringify(client),
    });

};

// удаление данных с сервера
export const deleteClient = async (id) => {
    const response = await fetch(urlAdress + id, {
        method: 'DELETE'
    });
};

// изменение данных на сервере
export const editClient = async (client, id) => {
    const response = await fetch(urlAdress + id, {
        method: 'PATCH',
        body: JSON.stringify(client),
    });
};