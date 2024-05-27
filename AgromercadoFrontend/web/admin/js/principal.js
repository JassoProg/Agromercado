let cm = null; //Current Module

function obtenerPreciosSemillas() {
    return {
        semillas: ['Maíz', 'Frijol', 'Zanahoria', 'Girasol', 'Chía', 'Calabaza'],
        precios: [5.00, 6.50, 4.20, 7.80, 3.75, 5.67]
    };
}
const dataPreciosSemillas = obtenerPreciosSemillas();
const seedConfig = {
    type: 'bar',
    data: {
        labels: dataPreciosSemillas.semillas,
        datasets: [{
                label: 'Precios de Semillas',
                data: dataPreciosSemillas.precios,
                backgroundColor: [
                    'rgba(33, 119, 101, 0.5)',
                    'rgba(130, 75, 55, 0.5)',
                    'rgba(255, 205, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 191, 130, 0.2)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(33, 119, 101, 1)',
                    'rgba(130, 75, 55, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 191, 130, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};
var seedChart = new Chart(
        document.getElementById('mySeedChart'),
        seedConfig
        );

function obtenerSemillasMasVendidas() {
    return {
        semillas: ['Maíz', 'Frijol', 'Zanahoria', 'Girasol', 'Chía', 'Calabaza'],
        ventas: [500, 300, 200, 400, 250, 180]
    };
}

const dataSemillasMasVendidas = obtenerSemillasMasVendidas();
const config = {
    type: 'doughnut',
    data: {
        labels: dataSemillasMasVendidas.semillas,
        datasets: [{
                label: 'Semillas más vendidas',
                data: dataSemillasMasVendidas.ventas,
                backgroundColor: [
                    'rgba(33, 119, 101, 0.5)',
                    'rgba(130, 75, 55, 0.5)',
                    'rgba(255, 205, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 191, 130, 0.2)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(33, 119, 101, 1)',
                    'rgba(130, 75, 55, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 191, 130, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
};
var myChart = new Chart(
        document.getElementById('myChart'),
        config
        );

function buscarClima() {
    const ciudad = document.getElementById('cityInput').value.trim();
    const apiKey = '1';

    if (ciudad === '') {
        Swal.fire('Por favor ingrese el nombre de la ciudad.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric`;

    fetch(url)
            .then(response => response.json())
            .then(data => {
                const city = data.city.name;
                const forecastList = data.list;

                const maxTemp = Math.max(...forecastList.map(item => item.main.temp_max));
                const minTemp = Math.min(...forecastList.map(item => item.main.temp_min));

                const buenDiaParaCosechar = esBuenDiaParaCosechar(forecastList);

                limpiarModal();

                document.getElementById("city").textContent = city;
                document.getElementById("maxTemp").textContent = `${maxTemp}°C`;
                document.getElementById("minTemp").textContent = `${minTemp}°C`;
                const weatherIcon = document.getElementById("weatherIcon");
                if (maxTemp >= 30) {
                    weatherIcon.innerHTML = '<img src="../media/img/sol.png" alt=""/>';
                } else {
                    weatherIcon.innerHTML = '<img src="../media/img/nube.png" alt=""/>';
                }
                const diasBuenosParaCosechar = document.getElementById("diasBuenosParaCosechar");
                if (maxTemp >= 25) {
                    diasBuenosParaCosechar.textContent = '¡Es un buen día para cosechar!';
                } else {
                    diasBuenosParaCosechar.textContent = 'No es un buen día para cosechar.';
                }
                document.getElementById('myModal').style.display = "block";
            })
            .catch(error => {
                console.error('Error al buscar el clima:', error);
                Swal.fire('Ingrese datos correctos.');
            });
}

function cerrarModal() {
    document.getElementById('myModal').style.display = "none";
}

function limpiarModal() {
    document.getElementById("city").textContent = "";
    document.getElementById("maxTemp").textContent = "";
    document.getElementById("minTemp").textContent = "";
    document.getElementById("weatherIcon").innerHTML = "";
    document.getElementById("diasBuenosParaCosechar").textContent = "";
}

function esBuenDiaParaCosechar(forecastList) {
    return true;
}

AOS.init({
    offset: 1
});
