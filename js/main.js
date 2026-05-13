import { fetchCharacters } from "./api.js";
import { renderCard, clearCards, updatePagination, showStatus, hideStatus } from "./ui.js";

let currentPage = 1;
let totalPages = 1;
let currentFilters = {};

async function loadCharacters(page = 1, filters = {}) {
  try {
    clearCards();
    hideStatus();

    const data = await fetchCharacters(page, filters);

    if (data.results.length === 0) {
      showStatus("No se encontraron personajes con los filtros aplicados.");
      updatePagination(1, 1);
      return;
    }

    data.results.forEach(renderCard);
    currentPage = page;
    totalPages = data.info.pages;
    updatePagination(currentPage, totalPages);
  } catch (error) {
    showStatus(`Error: ${error.message}`);
  }
}

function getFilters() {
  return {
    name: document.getElementById("search-name").value,
    status: document.getElementById("filter-status").value,
    species: document.getElementById("filter-species").value,
    gender: document.getElementById("filter-gender").value,
  };
}

function clearFilters() {
  document.getElementById("search-name").value = "";
  document.getElementById("filter-status").value = "";
  document.getElementById("filter-species").value = "";
  document.getElementById("filter-gender").value = "";
  currentFilters = {};
  currentPage = 1;
  loadCharacters(1, {});
}

document.getElementById("btn-search").addEventListener("click", () => {
  currentFilters = getFilters();
  currentPage = 1;
  loadCharacters(1, currentFilters);
});

document.getElementById("btn-clear").addEventListener("click", clearFilters);

document.getElementById("btn-prev").addEventListener("click", () => {
  if (currentPage > 1) {
    loadCharacters(currentPage - 1, currentFilters);
    window.scrollTo(0, 0);
  }
});

document.getElementById("btn-next").addEventListener("click", () => {
  if (currentPage < totalPages) {
    loadCharacters(currentPage + 1, currentFilters);
    window.scrollTo(0, 0);
  }
});

loadCharacters(1);