// app.js

// Fetch and display news articles from a third-party API
document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById('newsContainer');
    const searchForm = document.getElementById('searchForm');
    const globalSearchInput = document.getElementById('globalSearch');
    const API_KEY = 'f0afae64b99a43d9bc1fef46bbdb5c2a';
    let API_URL = `https://newsapi.org/v2/everything?q=tesla&from=2024-12-05&sortBy=publishedAt&apiKey=${API_KEY}`;

    // Fetch and display articles
    function fetchAndDisplayArticles(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                newsContainer.innerHTML = ''; // Clear previous results
                const articles = data.articles || [];
                if (articles.length > 0) {
                    articles.forEach(article => {
                        const col = document.createElement('div');
                        col.classList.add('col-md-4');

                        col.innerHTML = `
                            <div class="card">
                                <img src="${article.urlToImage || 'placeholder.jpg'}" class="card-img-top" alt="${article.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${article.title}</h5>
                                    <p class="card-text">${article.description || 'No description available.'}</p>
                                    <p class="text-muted">By ${article.author || 'Unknown'} on ${new Date(article.publishedAt).toLocaleDateString()}</p>
                                    <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        `;

                        newsContainer.appendChild(col);
                    });

                    const articleCount = document.createElement('p');
                    articleCount.textContent = `Total articles: ${articles.length}`;
                    document.querySelector('.container').prepend(articleCount);
                } else {
                    newsContainer.innerHTML = '<p>No news articles found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching news articles:', error);
                newsContainer.innerHTML = `<p>Error fetching news articles: ${error.message}</p>`;
            });
    }

    // Initial fetch
    fetchAndDisplayArticles(API_URL);

    // Handle search form submission
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const author = document.getElementById('author').value;
        const fromDate = document.getElementById('fromDate').value;
        const toDate = document.getElementById('toDate').value;
        const type = document.getElementById('type').value;
        const keyword = globalSearchInput.value;

        let query = '';

        if (keyword) {
            query += `q=${keyword}`;
        }

        if (author) {
            query += `&author=${author}`;
        }

        if (fromDate) {
            query += `&from=${fromDate}`;
        }

        if (toDate) {
            query += `&to=${toDate}`;
        }

        if (type) {
            query += `&type=${type}`;
        }

        API_URL = `https://newsapi.org/v2/everything?${query}&apiKey=${API_KEY}`;
        fetchAndDisplayArticles(API_URL);
    });
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulated login validation
    if (email === "user@example.com" && password === "password123") {
        alert("Login successful!");
    } else {
        alert("Invalid email or password.");
    }
});

// Google and GitHub login placeholders
document.getElementById('googleLogin').addEventListener('click', () => {
    alert("Google login functionality will be implemented here.");
});

document.getElementById('githubLogin').addEventListener('click', () => {
    alert("GitHub login functionality will be implemented here.");
});
