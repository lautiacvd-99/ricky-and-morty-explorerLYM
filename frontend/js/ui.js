 
const grid = document.getElementById("characters-grid");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("error-message");
 
/**
 * Renderiza una card de personaje en el grid.
 * objeto que trae la api 
 */
export function renderCard(character) {
  const { name, status, species, gender, origin, location, image } = character;
 
  const statusClass = {
    Alive: "status--alive",
    Dead: "status--dead",
    unknown: "status--unknown",
  }[status] ?? "status--unknown";
 
  const card = document.createElement("article");
  card.classList.add("card");
  card.innerHTML = `
    <img class="card__img" src="${image}" alt="Foto de ${name}" loading="lazy" />
    <div class="card__body">
      <h2 class="card__name">${name}</h2>
      <span class="card__status ${statusClass}">
        <span class="card__status-dot"></span>
        ${status} — ${species}
      </span>
      <dl class="card__info">
        <dt>Género</dt>
        <dd>${gender}</dd>
        <dt>Origen</dt>
        <dd>${origin.name}</dd>
        <dt>Última ubicación</dt>
        <dd>${location.name}</dd>
      </dl>
    </div>
  `;
 
  grid.appendChild(card);
}
 
/**
 * hace un loader mientras se espera los datos de la api
 */
export function showLoader() {
  if (loader) loader.style.display = "block";
}
 
/**
 * llega los datos y quita el loader de la pantalla 
 */
export function hideLoader() {
  if (loader) loader.style.display = "none";
}
 
/**
 * Muestra un mensaje de error en pantalla.
 * @
 */
export function showError(message) {
  if (!errorMsg) return;
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}
 
/**
 * limpia las card del dom 
 */
export function clearCards() {
  if (grid) grid.innerHTML = "";
}
62