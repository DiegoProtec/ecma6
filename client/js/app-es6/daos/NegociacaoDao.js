import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction(this._store, 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error.name);
                reject('Não há registros.');
            };
        });
    }

    lista() {

        return new Promise((resolve, reject) => {

            let negociacoes = [];
            let cursor = this._connection
                .transaction(this._store, 'readonly')
                .objectStore(this._store)
                .openCursor();

            cursor.onsuccess = e => {
                let atual = e.target.result;
                if (atual) {

                    let negociacao = atual.value;
                    negociacoes.push(new Negociacao(negociacao._data, negociacao._quantidade, negociacao._valor));
                    atual.continue();
                } else {

                    resolve(negociacoes);
                }
            };

            cursor.onerror = e => {

                console.log(e.target.error.name);
                reject('Não foi possível listar as negociações.');
            };
        });
    }

    apaga() {
        return new Promise((resolve, reject) => {

            let request = this._connection
            .transaction(this._store, 'readwrite')
            .objectStore(this._store)
            .clear();

            request.onsuccess = () => resolve('Negociações apagadas com sucesso.');
            request.onerror = () => reject('Não foi possível apagar as negociações.');
        });
    }
}