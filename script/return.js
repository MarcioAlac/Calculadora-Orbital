const Angulos = [
    {
        GravidadePorAltura: 9.80288279274985,
        TurPorAltura: 119987.28538325816,
        altitude: 2000,
        angulo: 78.38104996137776
    },
    {
        GravidadePorAltura: 9.792684735918295,
        TurPorAltura: 119862.46116763992,
        altitude: 4000,
        angulo: 73.56832327484501
    },
    {
        GravidadePorAltura: 9.772336965600339,
        TurPorAltura: 119613.39638054815,
        altitude: 8000,
        angulo: 66.7620999227555
    },
    {
        GravidadePorAltura: 9.731829255694633,
        TurPorAltura: 119117.59008970231,
        altitude: 16000,
        angulo: 57.136646549690035
    },
    {
        GravidadePorAltura: 9.651567088996654,
        TurPorAltura: 118135.18116931904,
        altitude: 32000,
        angulo: 43.524199845511
    },
    {
        GravidadePorAltura: 9.493993130206933,
        TurPorAltura: 116206.47591373287,
        altitude: 64000,
        angulo: 24.2732930938007
    },
    {
        GravidadePorAltura: 9.180205108610822,
        TurPorAltura: 112.94306703397612,
        altitude: 120000,
        angulo: 0
    }
];

function parserNumber(num, decimal = 2) {
    return num.toFixed(decimal).replace(',', '.').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function View() {
    const tbody = document.getElementById('tabelaDados');
    let i = 0;
    
    while (i < Angulos.length) {
        const item = Angulos[i];
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td class="numero">${item.altitude.toLocaleString('pt-BR')} Metros</td>
            <td class="numero">${parserNumber(item.angulo)}°</td>
            <td class="numero">${parserNumber(item.GravidadePorAltura, 4)} m/s²</td>
            <td class="numero">${item.TurPorAltura.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} Newtons</td>
        `;
        
        tbody.appendChild(tr);
        i++;
    }
}

document.addEventListener('DOMContentLoaded', View);