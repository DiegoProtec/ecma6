'use strict';

System.register(['./HttpService', './ConnectionFactory', '../models/Negociacao', '../daos/NegociacaoDao'], function (_export, _context) {
	"use strict";

<<<<<<< HEAD
	var HttpService, ConnectionFactory, Negociacao, NegociacaoDao, _createClass, NegociacaoService;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_HttpService) {
			HttpService = _HttpService.HttpService;
		}, function (_ConnectionFactory) {
			ConnectionFactory = _ConnectionFactory.ConnectionFactory;
		}, function (_modelsNegociacao) {
			Negociacao = _modelsNegociacao.Negociacao;
		}, function (_daosNegociacaoDao) {
			NegociacaoDao = _daosNegociacaoDao.NegociacaoDao;
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

			_export('NegociacaoService', NegociacaoService = function () {
				function NegociacaoService() {
					_classCallCheck(this, NegociacaoService);

					this._http = new HttpService();
				}

				_createClass(NegociacaoService, [{
					key: 'importar',
					value: function importar(lista) {

						var self = this;
						return new Promise(function (resolve, reject) {
							ConnectionFactory;
							self.obterNegociacoes().then(function (negociacoes) {
								return negociacoes.filter(function (negociacao) {
									return !lista.some(function (negociacaoExistente) {
										return negociacao.isEquals(negociacaoExistente);
									});
								});
							}).then(function (negociacoes) {
								return resolve(negociacoes);
							}).catch(function (erro) {
								return reject(erro);
							});
						});
					}
				}, {
					key: 'cadastrar',
					value: function cadastrar(negociacao) {
						return new Promise(function (resolve, reject) {
							ConnectionFactory.get().then(function (connection) {
								return new NegociacaoDao(connection);
							}).then(function (dao) {
								return dao.adiciona(negociacao);
							}).then(function () {
								return resolve('Negociação cadastrada com sucesso.');
							}).catch(function () {
								return reject('Não foi possível cadastrar negociação.');
							});
						});
					}
				}, {
					key: 'listar',
					value: function listar() {

						return new Promise(function (resolve, reject) {
							ConnectionFactory.get().then(function (connection) {
								return new NegociacaoDao(connection);
							}).then(function (dao) {
								return dao.lista();
							}).then(function (negociacoes) {
								return resolve(negociacoes);
							}).catch('Não foi possível listar negociações.');
						});
					}
				}, {
					key: 'apagar',
					value: function apagar() {

						return new Promise(function (resolve, reject) {
							ConnectionFactory.get().then(function (connection) {
								return new NegociacaoDao(connection);
							}).then(function (dao) {
								return dao.apaga();
							}).then(function (mensagem) {
								return resolve(mensagem);
							}).catch(function (erro) {
								return reject(erro);
							});
						});
					}
				}, {
					key: 'negociacoesSemana',
					value: function negociacoesSemana() {
						var _this = this;

						return new Promise(function (resolve, reject) {
							_this._http.get('negociacoes/semana').then(function (negociacoes) {
								return resolve(negociacoes.map(function (objeto) {
									return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
								}));
							}).catch(function (erro) {
								console.log(erro);
								reject('Não foi possível importar negociações da semana.');
							});
						});
					}
				}, {
					key: 'negociacoesSemanaAnterior',
					value: function negociacoesSemanaAnterior() {
						var _this2 = this;
=======
	negociacoesSemana() {

		return new Promise((resolve, reject) => {
			this._http
			.get('negociacoes/semana')
			.then(negociacoes => resolve(negociacoes
				.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
			.catch(erro => {
				reject('Não foi possível importar negociações da semana.');
			});
		});		
	}

	negociacoesSemanaAnterior() {

		return new Promise((resolve, reject) => {
			this._http
			.get('negociacoes/anterior')
			.then(negociacoes => resolve(negociacoes
				.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
			.catch(erro => {
				reject('Não foi possível importar negociações da semana anterior.');
			});
		});
	}

	negociacoesSemanaRetrasada() {

		return new Promise((resolve, reject) => {
			this._http
			.get('negociacoes/retrasada')
			.then(negociacoes => resolve(negociacoes
				.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
			.catch(erro => {
				reject('Não foi possível importar negociações da semana retrasada.');
			});
		});
	}
>>>>>>> f25d0a6198cf07e8f1356ebba7b65087836e043c

						return new Promise(function (resolve, reject) {
							_this2._http.get('negociacoes/anterior').then(function (negociacoes) {
								return resolve(negociacoes.map(function (objeto) {
									return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
								}));
							}).catch(function (erro) {
								console.log(erro);
								reject('Não foi possível importar negociações da semana.');
							});
						});
					}
				}, {
					key: 'negociacoesSemanaRetrasada',
					value: function negociacoesSemanaRetrasada() {
						var _this3 = this;

						return new Promise(function (resolve, reject) {
							_this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
								return resolve(negociacoes.map(function (objeto) {
									return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
								}));
							}).catch(function (erro) {
								console.log(erro);
								reject('Não foi possível importar negociações da semana.');
							});
						});
					}
				}, {
					key: 'obterNegociacoes',
					value: function obterNegociacoes() {
						var _this4 = this;

<<<<<<< HEAD
						return new Promise(function (resolve, reject) {
=======
            Promise.all([
                this.negociacoesSemana(),
                this.negociacoesSemanaAnterior(),
                this.negociacoesSemanaRetrasada()
            ]).then(periodos => {
>>>>>>> f25d0a6198cf07e8f1356ebba7b65087836e043c

							Promise.all([_this4.negociacoesSemana(), _this4.negociacoesSemanaAnterior(), _this4.negociacoesSemanaRetrasada()]).then(function (periodos) {
								var negociacoes = periodos.reduce(function (dados, periodo) {
									return dados.concat(periodo);
								}, []).map(function (dado) {
									return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
								});
								resolve(negociacoes);
							}).catch(function (erro) {
								return reject(erro);
							});
						});
					}
				}]);

				return NegociacaoService;
			}());

			_export('NegociacaoService', NegociacaoService);
		}
	};
});
//# sourceMappingURL=NegociacaoService.js.map