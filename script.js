function addLinha() {
    var janelaCentral = document.getElementById('janelaCentral')
    var novaLinha = document.createElement('div')
    novaLinha.className = 'linhaDeDados'
    novaLinha.innerHTML = `<div class="linhaDeDados">
                <div class="grupoDados">
                    <p>Número do Voo</p>
                    <textarea name="textNumeroVoo"></textarea>
                </div>
                <div class="grupoDados">
                    <p>Origem e Destino</p>
                    <textarea name="textOrigemDestino"></textarea>
                </div>
                <div class="grupoDados">
                    <p>Peso da Carga</p>
                    <textarea name="textPesoCarga"></textarea>
                </div>
                <div class="grupoDados">
                    <p>Motivo</p>
                    <div class="inputComBotao">
                        <textarea name="motivo" id="textMotivo" maxlength="29"></textarea>
                        <button id="botaoRemover" onclick="removerLinha(this)">✖</button>
                    </div>
                </div>
            </div>`
    janelaCentral.appendChild(novaLinha)
}

function removerLinha(botao) {
    const linhaParaRemover = botao.closest('.linhaDeDados')
    linhaParaRemover.remove()
}

