export class HttpService {

	_handleErrors(res) {
		if (!res.ok)
			throw new Error(res.statusText);
		return res;
	}

	get(url) {
		return fetch(url)
			.then(res => this._handleErrors(res))
			.then(res => res.json());
	}

	post(url, metodo, tipo, dado) {

		tipo = tipo.trim(tipo);
		metodo = metodo.trim(metodo)
		url = url.trim(url);

		return fetch(url, {
			headers: { 'Content-type': tipo },
			method: metodo,
			body: JSON.stringify(dado)
		})
			.then(res => this._handleErrors(res));
	}
}