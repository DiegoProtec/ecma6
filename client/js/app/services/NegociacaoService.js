class NegociacaoService {

	constructor() {
		this._http = new HttpService();
	}

	negociacoesSemana() {

		return new Promise((resolve, reject) => {
			this._http
			.get('negociacoes/semana')
			.then(negociacoes => 
				resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
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
			.then(negociacoes => 
				resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
			.catch(erro => {
				console.log(erro);
				reject('Não foi possível importar negociações da semana anterior.');
			});
		});
	}

	negociacoesSemanaRetrasada() {

		return new Promise((resolve, reject) => {
			this._http
			.get('negociacoes/retrasada')
			.then(negociacoes => 
				resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
			.catch(erro => {
				console.log(erro);
				reject('Não foi possível importar negociações da semana retrasada.');
			});
		});
	}

	obterNegociacoes() {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]).then(periodos => {

                let negociacoes = periodos
                    .reduce((dados, periodo) => dados.concat(periodo), [])
                    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

                resolve(negociacoes);

            }).catch(erro => reject(erro));
        });
    }
}