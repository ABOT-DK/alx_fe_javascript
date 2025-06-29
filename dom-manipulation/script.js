let quotes = [];

// Load quotes from localStorage or set default
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "The best way to predict the future is to create it.", category: "Motivation" },
      { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
      { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" }
    ];
    saveQuotes();
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate dropdown with unique categories
function populateCategories() {
  const categories = Array.from(new Set(quotes.map(q => q.category)));
  categorySelect.innerHTML = '<option value="all">All</option>';
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Filter quotes by selected category (categoryFilter)
function categoryFilter() {
  const selectedCategory = categorySelect.value;
  return selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);
}

// Display a random quote from filtered quotes (filterQuote)
function filterQuote() {
  const filteredQuotes = categoryFilter();

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;

  // Save last viewed quote to sessionStorage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();

  document.getElementById("newQuoteText").value = '';
  document.getElementById("newQuoteCategory").value = '';
  alert("Quote added!");
}

// Create the Add Quote Form dynamically
function createAddQuoteForm() {
  const container = document.getElementById("addQuoteFormContainer");

  const inputQuote = document.createElement("input");
  inputQuote.type = "text";
  inputQuote.id = "newQuoteText";
  inputQuote.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  const button = document.createElement("button");
  button.textContent = "Add Quote";
  button.addEventListener("click", addQuote);

  container.appendChild(inputQuote);
  container.appendChild(inputCategory);
  container.appendChild(button);
}

// Export current quotes to a downloadable JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import quotes from a selected JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (!Array.isArray(importedQuotes)) {
        throw new Error("Invalid format. Must be an array of quotes.");
      }
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Import failed: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Show the last quote viewed (if exists)
function showLastViewedQuote() {
  const last = sessionStorage.getItem("lastViewedQuote");
  if (last) {
    const quote = JSON.parse(last);
    quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  }
}

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const categorySelect = document.getElementById("categorySelect");

// Event listeners
document.getElementById("newQuote").addEventListener("click", filterQuote);
categorySelect.addEventListener("change", filterQuote);

// Initialize app
window.onload = () => {
  loadQuotes();
  populateCategories();
  createAddQuoteForm();
  showLastViewedQuote();
};
