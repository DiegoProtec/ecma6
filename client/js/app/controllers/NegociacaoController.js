class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');

        let self = this;
        this._negociacoes = new Proxy(new Negociacoes(), {
            get(target, prop, receiver) {
                if(['adiciona','limpa'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    return function() {
                        console.log(`"${prop}" -> interceptada.`);
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });
            
        this._negociacoesView = new NegociacoesView($('#tableNegociacoes'));
        this._negociacoesView.update(this._negociacoes);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagem'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();

        this._negociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso.';
        this._mensagemView.update(this._mensagem);

        this._limpaForm();
    }

    apaga(event){
        this._negociacoes.limpa();
        this._mensagem.texto = 'Negociações removidas com sucesso!';
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            this._data.value,
            this._quantidade.value,
            this._valor.value);
    }

    _limpaForm() {
        this._data.value = '';
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus();
    }

}