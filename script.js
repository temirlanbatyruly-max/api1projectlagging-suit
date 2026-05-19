const fetchBtn = document.getElementById('fetchBtn');
const loader = document.getElementById('loader');
const content = document.getElementById('content');

// Helper function to create an artificial delay
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function getLaggyData() {
    // 1. Reset UI & Show Loader
    content.innerHTML = '';
    loader.classList.remove('hidden');
    fetchBtn.disabled = true;

    try {
        // 2. The "Lag" - Wait for 3 seconds before doing anything
        await delay(3000);

        // 3. Fetch from a real API (JSONPlaceholder is great for tutorials)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        
        if (!response.ok) throw new Error("Server took too long to respond!");

        const data = await response.json();

        // 4. Render the Data
        renderData(data);
    } catch (error) {
        content.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    } finally {
        // 5. Clean up
        loader.classList.add('hidden');
        fetchBtn.disabled = false;
    }
}

function renderData(posts) {
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'card';
        postEl.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        content.appendChild(postEl);
    });
}

fetchBtn.addEventListener('click', getLaggyData);