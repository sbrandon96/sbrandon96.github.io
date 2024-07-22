// Development with localhost only

document.addEventListener('DOMContentLoaded', (event) => {
    const apiKey = 'f352efee7daf4e0280484b6b55fe5d43';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the full response for debugging
            const articlesDiv = document.getElementById('articles');
            articlesDiv.innerHTML = ''; // Clear any existing content
            
            if (data && data.articles) {
                let articles = data.articles;
                let articleCount = 0;
                
                articles.forEach(article => {
                    if (articleCount < 6 && !article.title.includes('[Removed]')) {
                        let articleElement = document.createElement('article');
                        let articleLink = document.createElement('a');
                        articleLink.href = article.url;
                        articleLink.target = '_blank';
                        articleLink.innerText = article.title;
                        
                        articleElement.appendChild(articleLink);
                        articlesDiv.appendChild(articleElement);
                        articleCount++;
                    }
                });
            } else {
                console.error('No articles found in the response:', data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
