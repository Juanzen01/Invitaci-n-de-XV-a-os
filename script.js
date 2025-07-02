// Configura la fecha de tu evento (año, mes-1, día, hora, minuto)
const eventDate = new Date(2025, 6, 26, 15, 0); // 26 de julio 2025, 7:00 PM

function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    // Cálculos de tiempo
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Mostrar en el HTML
    const countdownElement = document.querySelector('#reloj .section__description');

    if (diff > 0) {
        countdownElement.innerHTML = `
      <div class="countdown">
        <div class="countdown__item">
          <span class="countdown__number">${days}</span>
          <span class="countdown__label">Días</span>
        </div>
        <div class="countdown__item">
          <span class="countdown__number">${hours}</span>
          <span class="countdown__label">Horas</span>
        </div>
        <div class="countdown__item">
          <span class="countdown__number">${minutes}</span>
          <span class="countdown__label">Minutos</span>
        </div>
        <div class="countdown__item">
          <span class="countdown__number">${seconds}</span>
          <span class="countdown__label">Segundos</span>
        </div>
      </div>
      <p>¡Faltan para la gran celebración!</p>
    `;
    } else {
        countdownElement.innerHTML = `
      <div class="countdown countdown--finished">
        <p>¡El gran día ha llegado!</p>
        <p>¡Bienvenidos a mis XV años!</p>
      </div>
    `;
    }
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);

// Inicializar
updateCountdown();

// Configura el menú hamburguesa para dispositivos móviles
function setupHamburgerMenu() {
    const toggleButton = document.querySelector(".nav__toggle");
    const navMenu = document.querySelector(".nav__menu");

    toggleButton.addEventListener("click", () => {
        navMenu.classList.toggle("nav__menu--open");
        
        // Cambiar el ícono del botón
        if (navMenu.classList.contains("nav__menu--open")) {
            toggleButton.innerHTML = "&times;"; // Icono de "X"
        } else {
            toggleButton.innerHTML = "&#9776;"; // Icono de hamburguesa
        }
    });

    // Cerrar el menú al hacer clic en un enlace (para móviles)
    const navLinks = document.querySelectorAll(".nav__link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 767) {
                navMenu.classList.remove("nav__menu--open");
                toggleButton.innerHTML = "&#9776;";
            }
        });
    });
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    setupHamburgerMenu();
});

document.addEventListener('DOMContentLoaded', function() {
    const audioControl = document.querySelector('.audio-control');
    const audioPlayer = document.querySelector('.audio-hidden');
    const playIcon = document.querySelector('.icono-play');
    const pauseIcon = document.querySelector('.icono-pause');
    const audioBar = document.querySelector('.audio-bar');

    let isPlaying = false;

    audioControl.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            playIcon.hidden = false;
            pauseIcon.hidden = true;
        } else {
            audioPlayer.play();
            playIcon.hidden = true;
            pauseIcon.hidden = false;
        }
        isPlaying = !isPlaying;
    });

    // Actualizar barra de progreso
    audioPlayer.addEventListener('timeupdate', function() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        audioBar.style.width = progress + '%';
    });

    // Reiniciar al terminar (porque tiene loop)
    audioPlayer.addEventListener('ended', function() {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    });
});

document.getElementById('form-confirmar').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Mostrar estado "cargando"
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Éxito: ocultar formulario y mostrar mensaje
            form.hidden = true;
            document.getElementById('confirmacion-mensaje').hidden = false;
            
            // Opcional: Guardar en localStorage
            localStorage.setItem('asistenciaConfirmada', 'true');
        } else {
            throw new Error('Error al enviar');
        }
    } catch (error) {
        alert('Ocurrió un error. Por favor intenta nuevamente.');
        console.error(error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Confirmar';
    }
});

// Verificar si ya confirmó (al cargar la página)
if(localStorage.getItem('asistenciaConfirmada')) {
    document.getElementById('form-confirmar').hidden = true;
    document.getElementById('confirmacion-mensaje').hidden = false;
}