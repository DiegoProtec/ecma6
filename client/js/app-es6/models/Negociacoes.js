export class Negociacoes {

    constructor(negociacoes) {

        this._negociacoes = negociacoes || [];
        this._total = this._getTotal();
    }

    get negociacoes() {

        return [].concat(this._negociacoes, this._total);
    }

    _getTotal() {

        return this._negociacoes.reduce(
            ((e, n) => e += n.volume), 0.0
        );
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
        this._total = this._getTotal();
    }

    ordena(criterio) {

        this._negociacoes.sort(criterio);
    }

    inverteOrdem() {

        this._negociacoes.reverse();
    }

    limpa() {

        this._negociacoes = [];
        this._total = 0.0;
    }

}

