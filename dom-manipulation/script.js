// Sample quote data
let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" }
  ];
  
  // Load initial data into localStorage if empty
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
    quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}" — ${filteredQuotes[randomIndex].category}`;
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
    localStorage.setItem('quotes', JSON.stringify(quotes));
  
    populateCategories();
    document.getElementById("newQuoteText").value = '';
    document.getElementById("newQuoteCategory").value = '';
    alert("Quote added!");
  }
  
  // Event listener for button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Initialize on load
  window.onload = () => {
    populateCategories();
    showRandomQuote();
  };
  