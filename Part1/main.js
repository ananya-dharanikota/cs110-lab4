function buildUrl(sort, time) {
    const base = "https://api.nytimes.com/svc/mostpopular/v2";

    let nytUrl;
    if (sort === "mostshared") {
      nytUrl = `${base}/mostshared/all-sections/${time}.json?api-key=${API_KEY}`;
    } else if (sort === "mostviewed") {
      nytUrl = `${base}/mostviewed/all-sections/${time}.json?api-key=${API_KEY}`;
    } else if (sort === "mostemailed") {
      nytUrl = `${base}/mostemailed/all-sections/${time}.json?api-key=${API_KEY}`;
    }

    return `https://corsproxy.io/?${encodeURIComponent(nytUrl)}`;
  }

  async function fetchArticles() {
    const sort = document.querySelector('input[name="sort"]:checked').value;
    const time = document.querySelector('input[name="time"]:checked').value;
    const url = buildUrl(sort, time);
    const container = document.getElementById("articles-container");

    container.innerHTML = '<p class="status-message">Loading...</p>';

    try {
      const res = await fetch(url);
      const data = await res.json();

      // NYT returns faults or errors on bad key / bad endpoint
      if (!res.ok || data.fault || data.status === "ERROR") {
        const msg = data.fault?.faultstring
          || (Array.isArray(data.errors) ? data.errors.join(", ") : null)
          || `HTTP ${res.status}`;
        container.innerHTML = `<div class="error-message">⚠️ API error: ${msg}<br><small>URL tried: ${url}</small></div>`;
        return;
      }

      renderArticles(data.results);
    } catch (err) {
      container.innerHTML = `<div class="error-message">⚠️ ${err.message}<br><small>Make sure you're running via a local server (not file://). Try: <code>npx serve .</code></small></div>`;
    }
  }

  function renderArticles(articles) {
    const container = document.getElementById("articles-container");
    container.innerHTML = "";

    if (!articles || articles.length === 0) {
      container.innerHTML = '<p class="status-message">No articles found.</p>';
      return;
    }

    articles.forEach((article, i) => {
      const mediaMetadata = article.media?.[0]?.["media-metadata"] ?? [];
      const thumbnail = (mediaMetadata[2] ?? mediaMetadata[1] ?? mediaMetadata[0])?.url ?? null;

      const card = document.createElement("a");
      card.className = "nyt-article-card";
      card.href = article.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      card.innerHTML = `
        <div class="nyt-article-card-text">
          <div class="nyt-article-meta">
            <p class="nyt-article-title"><span class="article-number">${i + 1})</span> ${article.title}</p>
            <span class="nyt-article-date">${article.published_date}</span>
          </div>
          <p class="nyt-article-description">${article.abstract}</p>
        </div>
        ${thumbnail ? `<img class="nyt-article-image" src="${thumbnail}" alt="">` : ""}
      `;

      container.appendChild(card);
    });
  }

  document.querySelectorAll('input[name="sort"], input[name="time"]').forEach(input => {
    input.addEventListener("change", fetchArticles);
  });

  fetchArticles();