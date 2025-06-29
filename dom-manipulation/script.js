let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" }
  ];
  
  // Load or initialize localStorage
  if (!localStorage.getItem('quotes')) {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  } else {
    quotes = JSON.parse(localStorage.getItem('quotes'));
  }
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const categorySelect = document.getElementById("categorySelect");
  
  // Populate category dropdown
  function populateCategories() {
    const categories = Array.from(new Set(quotes.map(q => q.category)));
    categorySelect.innerHTML = '<option value="all">All</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  }
  
  // Show random quote
  function showRandomQuote() {
    const selectedCategory = categorySelect.value;
    const filteredQuotes = selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.textContent = "No quotes available in this category.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  }
  
  // Add quote from form
  function addQuote() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const text = quoteInput.value.trim();
    const category = categoryInput.value.trim();
  
    if (!text || !category) {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(quotes));
  
    populateCategories();
    quoteInput.value = '';
    categoryInput.value = '';
    alert("Quote added successfully!");
  }
  
  // Dynamically create Add Quote Form
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
  
  // Event listeners and initialization
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  window.onload = () => {
    populateCategories();
    createAddQuoteForm();
    showRandomQuote();
  };
  