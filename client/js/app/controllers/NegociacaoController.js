'use strict';

System.register(['../models/Mensagem', '../models/Negociacao', '../models/Negociacoes', '../views/MensagemView', '../views/NegociacoesView', '../services/NegociacaoService', '../helpers/DateHelper', '../helpers/Bind'], function (_export, _context) {
    "use strict";

    var Mensagem, Negociacao, Negociacoes, MensagemView, NegociacoesView, NegociacaoService, DateHelper, Bind, _createClass, NegociacaoController, negociacaoController;

<<<<<<< HEAD
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
=======
        this._negociacoes = new Bind(
            new Negociacoes(), 
            new NegociacoesView($('#tableNegociacoes')), 
            'adiciona','limpa');

        this._mensagem = new Bind(
            new Mensagem(), 
            new MensagemView($('#mensagem')), 
            'texto');
>>>>>>> f25d0a6198cf07e8f1356ebba7b65087836e043c
    }

    return {
        setters: [function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_modelsNegociacoes) {
            Negociacoes = _modelsNegociacoes.Negociacoes;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);

                    this._data = $('#data');
                    this._quantidade = $('#quantidade');
                    this._valor = $('#valor');

                    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView($('#tableNegociacoes')), 'adiciona', 'limpa', 'ordena', 'inverteOrdem');

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem')), 'texto');

                    this._ordemAtual = '';
                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        new NegociacaoService().listar().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._negociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            return _this.importa();
                        }, 3000);
                    }
                }, {
                    key: 'importa',
                    value: function importa() {
                        var _this2 = this;

                        new NegociacaoService().importar(this._negociacoes._negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                _this2._negociacoes.adiciona(negociacao);
                                new NegociacaoService().cadastrar(negociacao).then(function (mensagem) {
                                    return console.log(mensagem);
                                });
                            });
                            _this2._mensagem.texto = 'Negociações do período importadas e cadastradas';
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this3 = this;

                        event.preventDefault();
                        var negociacao = this._criaNegociacao();
                        new NegociacaoService().cadastrar(negociacao).then(function (mensagem) {
                            _this3._negociacoes.adiciona(negociacao);
                            _this3._mensagem.texto = mensagem;
                            _this3._limpaForm();
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this4 = this;

                        new NegociacaoService().apagar().then(function (mensagem) {
                            _this4._negociacoes.limpa();
                            _this4._mensagem.texto = mensagem;
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.paraData(this._data.value), parseInt(this._quantidade.value), parseFloat(this._valor.value));
                    }
                }, {
                    key: '_limpaForm',
                    value: function _limpaForm() {
                        this._data.value = '';
                        this._quantidade.value = 1;
                        this._valor.value = 0.0;
                        this._data.focus();
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {

                        if (this._ordemAtual == coluna) {
                            this._negociacoes.inverteOrdem();
                        } else {
                            this._negociacoes.ordena(function (p, s) {
                                return p[coluna] - s[coluna];
                            });
                        }
                        this._ordemAtual = coluna;
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {
                return negociacaoController;
            }

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map