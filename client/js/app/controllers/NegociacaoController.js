class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');

        this._negociacoes = new Bind(
            new Negociacoes(), 
            new NegociacoesView($('#tableNegociacoes')), 
            'adiciona','limpa');

        this._negociacoes = new Bind(
            new Mensagem(), 
            new MensagemView($('#mensagem')), 
            'texto');
    }

    adiciona(event) {
        event.preventDefault();

        this._negociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso.';
        this._limpaForm();
    }

    importa() {
        let service = new NegociacaoService();
        service
        .obterNegociacoes()
        .then(negociacoes => negociacoes.forEach(negociacao => {
            this._negociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociações do período importadas'   
        }))
        .catch(erro => this._mensagem.texto = erro);
    }

    apaga(event){
        this._negociacoes.limpa();
        this._mensagem.texto = 'Negociações removidas com sucesso!';
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.paraData(this._data.value),
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