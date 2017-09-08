const dbName = 'aluraframe';
const stores = ['negociacoes'];
const version = 1;

let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('Class ConnectionFactory não pode ser instanciada.')
    }

    static get() {
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {
                if (!connection) {
                    connection = e.target.result;
                    close = connection.close;
                    connection.close = function () {
                        throw new Error('Você não pode fechar diretamente a conexão');
                    };
                }
                resolve(connection);
            };

            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }

    static _createStores(connection) {

        stores.forEach(store => {

            if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

    static _closeConnection() {

        Reflect.apply(close, connection, []);
        connection = null;
    }
}