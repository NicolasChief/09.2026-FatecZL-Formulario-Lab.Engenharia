// Mostra a cidade embaixo do campo CEP assim que ele tem 8 dígitos (API pública ViaCEP).
const campoCep = document.getElementById('cep');
const saida = document.getElementById('cidade-cep');
let ultimoCep = '';

async function mostrarCidade() {
    const cep = campoCep.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        ultimoCep = '';
        saida.textContent = '';
        return;
    }
    if (cep === ultimoCep) return;   // já consultado
    ultimoCep = cep;
    saida.textContent = 'Buscando cidade...';

    try {
        const resposta = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
        const dados = await resposta.json();
        if (cep !== ultimoCep) return;   // a pessoa já mudou o CEP enquanto buscava
        saida.textContent = dados.erro ? 'CEP não encontrado.' : dados.localidade + ' - ' + dados.uf;
    } catch (erro) {
        if (cep === ultimoCep) saida.textContent = 'Não foi possível consultar o CEP agora.';
    }
}

campoCep.addEventListener('input', mostrarCidade);
campoCep.addEventListener('blur', mostrarCidade);
campoCep.form.addEventListener('reset', () => { ultimoCep = ''; saida.textContent = ''; });
mostrarCidade();   // quando o formulário volta com erro, o CEP já vem preenchido
