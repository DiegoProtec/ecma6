"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Negociacoes;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export("Negociacoes", Negociacoes = function () {
                function Negociacoes(negociacoes) {
                    _classCallCheck(this, Negociacoes);

                    this._negociacoes = negociacoes || [];
                    this._total = this._getTotal();
                }

                _createClass(Negociacoes, [{
                    key: "_getTotal",
                    value: function _getTotal() {

                        return this._negociacoes.reduce(function (e, n) {
                            return e += n.volume;
                        }, 0.0);
                    }
                }, {
                    key: "adiciona",
                    value: function adiciona(negociacao) {

                        this._negociacoes.push(negociacao);
                        this._total = this._getTotal();
                    }
                }, {
                    key: "ordena",
                    value: function ordena(criterio) {

                        this._negociacoes.sort(criterio);
                    }
                }, {
                    key: "inverteOrdem",
                    value: function inverteOrdem() {

                        this._negociacoes.reverse();
                    }
                }, {
                    key: "limpa",
                    value: function limpa() {

                        this._negociacoes = [];
                        this._total = 0.0;
                    }
                }, {
                    key: "negociacoes",
                    get: function get() {

                        return [].concat(this._negociacoes, this._total);
                    }
                }]);

                return Negociacoes;
            }());

            _export("Negociacoes", Negociacoes);
        }
    };
});
//# sourceMappingURL=Negociacoes.js.map