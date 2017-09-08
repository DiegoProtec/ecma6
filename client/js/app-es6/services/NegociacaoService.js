import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { Negociacao } from '../models/Negociacao';
import { NegociacaoDao } from '../daos/NegociacaoDao';

export class NegociacaoService {

	constructor() {
		this._http = new HttpService();
	}

	importar(lista) {

		let self = this;
		return new Promise((resolve, reject) => {
			ConnectionFactory
			self
				.obterNegociacoes()
				.then(negociacoes =>
					negociacoes.filter(negociacao =>
						!lista.some(negociacaoExistente =>
							negociacao.isEquals(negociacaoExistente)
						)
					)
				)
				.then(negociacoes => resolve(negociacoes))
				.catch(erro => reject(erro));
		});

	}

	cadastrar(negociacao) {
		return new Promise((resolve, reject) => {
			ConnectionFactory
				.get()
				.then(connection => new NegociacaoDao(connection))
				.then(dao => dao.adiciona(negociacao))
				.then(() => resolve('Negociação cadastrada com sucesso.'))
				.catch(() => reject('Não foi possível cadastrar negociação.'));
		});
	}

	listar() {

		return new Promise((resolve, reject) => {
			ConnectionFactory
				.get()
				.then(connection => new NegociacaoDao(connection))
				.then(dao => dao.lista())
				.then(negociacoes => resolve(negociacoes))
				.catch('Não foi possível listar negociações.');
		});
	}

	apagar() {

		return new Promise((resolve, reject) => {
			ConnectionFactory.get()
				.then(connection => new NegociacaoDao(connection))
				.then(dao => dao.apaga())
				.then(mensagem => resolve(mensagem))
				.catch(erro => reject(erro));
		});
	}

	negociacoesSemana() {

		return new Promise((resolve, reject) => {
			this._http
				.get('negociacoes/semana')
				.then(negociacoes => resolve(negociacoes.map(
					objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
				.catch(erro => {
					console.log(erro);
					reject('Não foi possível importar negociações da semana.');
				});
		});
	}

	negociacoesSemanaAnterior() {

		return new Promise((resolve, reject) => {
			this._http
				.get('negociacoes/anterior')
				.then(negociacoes => resolve(negociacoes.map(
					objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
				.catch(erro => {
					console.log(erro);
					reject('Não foi possível importar negociações da semana.');
				});
		});
	}

	negociacoesSemanaRetrasada() {

		return new Promise((resolve, reject) => {
			this._http
				.get('negociacoes/retrasada')
				.then(negociacoes => resolve(negociacoes.map(
					objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
				.catch(erro => {
					console.log(erro);
					reject('Não foi possível importar negociações da semana.');
				});
		});
	}

	obterNegociacoes() {

		return new Promise((resolve, reject) => {

			Promise.all([
				this.negociacoesSemana(),
				this.negociacoesSemanaAnterior(),
				this.negociacoesSemanaRetrasada()
			]).then(periodos => {
				let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), [])
					.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));
				resolve(negociacoes);
			}).catch(erro => reject(erro));
		});
	}
}