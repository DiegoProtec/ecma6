class Negociacoes {

    constructor() {
        this._negociacoes = [];
        this._total = 0.0;
    }

    get negociacoes() {
        return [].concat(this._negociacoes, this._total);
    }

    _getTotal() {
        this._total = this._negociacoes.reduce(
            ((e, n) => e += n.volume), 0.0
        );
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._getTotal();
    }

    limpa() {
        this._negociacoes = [];
        this._total = 0.0;
    }

}

