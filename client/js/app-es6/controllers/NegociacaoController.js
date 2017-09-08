import { Mensagem } from '../models/Mensagem';
import { Negociacao } from '../models/Negociacao';
import { Negociacoes } from '../models/Negociacoes';
import { MensagemView } from '../views/MensagemView';
import { NegociacoesView } from '../views/NegociacoesView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';

class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');

        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView($('#tableNegociacoes')),
            'adiciona', 'limpa', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagem')),
            'texto');

        this._ordemAtual = '';
        this._init();
    }

    _init() {

        new NegociacaoService()
            .listar()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        setInterval(() => this.importa(), 3000);
    }

    importa() {

        new NegociacaoService()
            .importar(this._negociacoes._negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => {
                    this._negociacoes.adiciona(negociacao);
                    new NegociacaoService()
                        .cadastrar(negociacao)
                        .then(mensagem => console.log(mensagem));
                });
                this._mensagem.texto = 'Negociações do período importadas e cadastradas';
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    adiciona(event) {

        event.preventDefault();
        let negociacao = this._criaNegociacao();
        new NegociacaoService()
            .cadastrar(negociacao)
            .then(mensagem => {
                this._negociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaForm();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga() {

        new NegociacaoService()
            .apagar()
            .then(mensagem => {
                this._negociacoes.limpa();
                this._mensagem.texto = mensagem;
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.paraData(this._data.value),
            parseInt(this._quantidade.value),
            parseFloat(this._valor.value));
    }

    _limpaForm() {
        this._data.value = '';
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus();
    }

    ordena(coluna) {

        if (this._ordemAtual == coluna) {
            this._negociacoes.inverteOrdem();
        } else {
            this._negociacoes.ordena((p, s) => p[coluna] - s[coluna]);
        }
        this._ordemAtual = coluna;
    }
}

let negociacaoController = new NegociacaoController();

export function currentInstance() {
    return negociacaoController;
}