document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.depDest').forEach(addBarraListener);
    document.querySelectorAll('.horario').forEach(addHorarioListener);

    setInterval(verificarHorarios, 10000);
    verificarHorarios();
});

function addLinha() {
    var janelaCentral = document.getElementById('janelaCentral');
    var novaLinha = document.createElement('div');
    novaLinha.className = 'linhaDeDados';
    novaLinha.innerHTML = `
        <div class="linhaDeDados">
                    <div class="grupoDados">
                        <p>Voo</p>
                        <textarea name="textNumeroVoo" maxlength="4"></textarea>
                    </div>
                    <div class="grupoDados">
                        <p>Dep / Dest</p>
                        <textarea name="textOrigemDestino" class="depDest" maxlength="7"></textarea>
                    </div>
                    <div class="grupoDados">
                        <p>Peso (Kg)</p>
                        <textarea name="textPesoCarga" maxlength="4"></textarea>
                    </div>
                    <div class="grupoDados">
                        <p>Motivo</p>
                        <textarea name="motivo" id="textMotivo" maxlength="21"></textarea>
                    </div>
                    <div class="grupoDados">
                        <p>ETD</p>
                            
                        <div class="inputComBotao">
                            <textarea name="motivo" class="horario"></textarea>
                            <button id="botaoRemover" onclick="removerLinha(this)">✖</button>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox">
                        </div>
                        <div class="status">
                            <p class="pendente" style="display: none;">Pendente</p>
                            <p class="feito" style="display: none;">Feito</p>
                        </div>
                    </div>
                </div>`;
    janelaCentral.appendChild(novaLinha);

    novaLinha.querySelectorAll('.depDest').forEach(addBarraListener);
    novaLinha.querySelectorAll('.horario').forEach(addHorarioListener);
    novaLinha.querySelector('.checkbox input').addEventListener('change', atualizarStatus);

    verificarHorarios();
}

function removerLinha(botao) {
    const linhaParaRemover = botao.closest('.linhaDeDados');
    linhaParaRemover.remove();
}

function addBarraListener(textarea) {
    textarea.addEventListener('input', function () {
        var texto = this.value.replace(/\//g, '');
        this.value = this.value.replace(/\d/g, '');

        if (texto.length > 3) {
            this.value = texto.slice(0, 3) + '/' + texto.slice(3);
        }
    });
}

function addHorarioListener(textarea) {
    textarea.addEventListener('input', function () {
        let texto = this.value.replace(/\D/g, '');

        if (texto.length > 4) {
            texto = texto.slice(0, 4);
        }

        if (texto.length >= 3) {
            texto = texto.slice(0, 2) + ':' + texto.slice(2, 4);
        }

        this.value = texto;
    });
}

function verificarHorarios() {
    const agora = new Date();
    const horasAtuais = agora.getUTCHours();
    const minutosAtuais = agora.getUTCMinutes();

    document.querySelectorAll('.linhaDeDados').forEach(linha => {
        const horarioTextarea = linha.querySelector('.horario');
        const checkbox = linha.querySelector('.checkbox input');
        const pendente = linha.querySelector('.pendente');
        const feito = linha.querySelector('.feito');

        if (horarioTextarea) {
            const [horasDigitadas, minutosDigitadas] = horarioTextarea.value.split(':').map(Number);

            if (horasDigitadas !== undefined && minutosDigitadas !== undefined) {
                if (horasDigitadas < horasAtuais || (horasDigitadas === horasAtuais && minutosDigitadas < minutosAtuais)) {
                    linha.classList.add('verde');
                    checkbox.disabled = false;

                    if (!checkbox.checked) {
                        pendente.style.display = 'block';
                        feito.style.display = 'none';
                    }
                } else {
                    linha.classList.remove('verde');
                    pendente.style.display = 'none';
                    feito.style.display = 'none';
                    checkbox.disabled = true;
                }
            }
        }
    });
}

function atualizarStatus(event) {
    const checkbox = event.target;
    const linha = checkbox.closest('.linhaDeDados');
    const pendente = linha.querySelector('.pendente');
    const feito = linha.querySelector('.feito');

    if (checkbox.checked) {
        pendente.style.display = 'none';
        feito.style.display = 'block';
    } else {
        pendente.style.display = 'block';
        feito.style.display = 'none';
    }
}

document.querySelectorAll('.checkbox input').forEach(input => {
    input.addEventListener('change', atualizarStatus);
});
