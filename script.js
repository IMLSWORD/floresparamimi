const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
let index = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let dragging = false;

// Función para actualizar la posición
function setPosition() {
  slides.style.transform = `translateX(${currentTranslate}px)`;
}

// Al iniciar el toque o clic
function touchStart(e) {
  dragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
  slides.style.transition = 'none'; // Sin animación mientras arrastramos
}

// Durante el arrastre
function touchMove(e) {
  if (!dragging) return;
  const currentX = e.touches ? e.touches[0].clientX : e.clientX;
  const diff = currentX - startX;
  currentTranslate = prevTranslate + diff;
  setPosition();
}

// Al soltar
function touchEnd() {
  dragging = false;
  const width = window.innerWidth;

  // Detectar si se pasó el umbral para cambiar de imagen
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && index < images.length - 1) index++;
  if (movedBy > 100 && index > 0) index--;

  // Ajustar a la nueva posición
  currentTranslate = -index * width;
  prevTranslate = currentTranslate;
  slides.style.transition = 'transform 0.4s ease';
  setPosition();
}

// Eventos para móvil y desktop
slides.addEventListener('mousedown', touchStart);
slides.addEventListener('mousemove', touchMove);
slides.addEventListener('mouseup', touchEnd);
slides.addEventListener('mouseleave', () => dragging && touchEnd());

slides.addEventListener('touchstart', touchStart);
slides.addEventListener('touchmove', touchMove);
slides.addEventListener('touchend', touchEnd);

window.addEventListener('resize', () => {
  // Mantener el slide correcto al cambiar tamaño
  currentTranslate = -index * window.innerWidth;
  prevTranslate = currentTranslate;
  setPosition();
});


const touchContainer = document.querySelector('.touch-flowers');

function createTouchFlower(x, y) {
  const flower = document.createElement('div');
  flower.classList.add('touch-flower');

  // Posición inicial centrada en el dedo
  flower.style.left = `${x - 20}px`; // -20 para centrar (40px ancho)
  flower.style.top = `${y - 20}px`;

  // Tamaño aleatorio para variedad
  const size = 20 + Math.random() * 40; // 20 a 60px
  flower.style.width = `${size}px`;
  flower.style.height = `${size}px`;

  // Pequeño giro aleatorio
  const rotation = Math.random() * 360;
  flower.style.transform += ` rotate(${rotation}deg)`;

  touchContainer.appendChild(flower);

  // Eliminar después de la animación
  setTimeout(() => flower.remove(), 1500);
}

// Detectar movimiento del dedo o mouse
function handleMove(e) {
  const touches = e.touches ? e.touches[0] : e;
  createTouchFlower(touches.clientX, touches.clientY);
}

window.addEventListener('mousemove', handleMove);
window.addEventListener('touchmove', handleMove);
