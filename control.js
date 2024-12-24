window.addEventListener('load', function() {
    // Tiempo mínimo para mostrar la animación de carga (en milisegundos)
    const minimumLoadingTime = 5000; // 5 segundos
  
    // Obtener el tiempo actual del dispositivo al cargar la página
    const startTime = performance.now();

    // Crear el mensaje dinámico
    const message = document.createElement('div');
    message.id = 'time-message';
    message.style.textAlign = 'center';
    message.style.fontSize = '1.5rem';
    message.style.marginTop = '20px';
    message.style.display = 'none';
    document.body.appendChild(message);

    // Función para ocultar la animación de carga y verificar la hora
    const hideLoaderAndCheckTime = () => {
        const loader = document.getElementById('loader');
        const content = document.getElementById('content');
        const now = new Date();
        const hours = now.getHours();

        loader.classList.add('fade-out'); // Clase para desvanecer el loader
        setTimeout(() => {
            loader.style.display = 'none';
            if (hours >= 18) { // 6:00 p.m. o más
                content.classList.remove('hidden');
                message.style.display = 'none';
            } else {
                content.classList.add('hidden');
                message.textContent = 'El contenido estará disponible después de las 6:00 p.m.';
                message.style.display = 'block';
            }
        }, 1000); // Tiempo de desvanecimiento
    };

    // Calcular cuánto tiempo ha pasado desde que comenzó la carga
    const elapsedTime = performance.now() - startTime;

    // Si el tiempo transcurrido es menor que el tiempo mínimo de carga, esperar el tiempo restante
    if (elapsedTime < minimumLoadingTime) {
        setTimeout(hideLoaderAndCheckTime, minimumLoadingTime - elapsedTime);
    } else {
        hideLoaderAndCheckTime();
    }
});
