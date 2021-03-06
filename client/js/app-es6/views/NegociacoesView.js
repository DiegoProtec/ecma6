import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegociacaoController'

export class NegociacoesView extends View {

    constructor(element) {
        super(element);
        element.addEventListener('click', function(event) {
            if(event.target.nodeName == 'TH')
                currentInstance().ordena(event.target.textContent.toLowerCase);
        })
    }

    template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                    </tr>
                </thead>
                <tbody>
                    ${model._negociacoes.map(i => `
                                <tr>
                                    <td>${DateHelper.paraTexto(i.data)}</td>
                                    <td>${i.quantidade}</td>
                                    <td>${i.valor}</td>
                                    <td>${i.volume}</td>
                                </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <td colspan="3"></td>
                    <td>${model._total}</td>
                </tfoot>
            </table>
        `;
    }

}