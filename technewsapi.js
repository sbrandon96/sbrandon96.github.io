document.addEventListener('DOMContentLoaded', (event) => {
    const apiKey = 'f352efee7daf4e0280484b6b55fe5d43';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const articlesDiv = document.getElementById('articles');
            articlesDiv.innerHTML = ''; // Clear any existing content
            
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
        })
        .catch(error => console.error('Error fetching data:', error));
});
