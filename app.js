/*
  VOICES OF DEMOCRACY — published stories
  Add new published articles to the STORIES array below.
  For each story, set:
    title, category, date, excerpt, image, imageAlt, url
  Use a relative url such as "posts/your-article.html".
*/

const STORIES = [
  {
    title: "Why local participation matters",
    category: "Community",
    date: "2026-10-28",
    excerpt: "Local decisions shape everyday life. Explore the ways residents can take part in the conversations and choices affecting their communities.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "A diverse group of people talking together outdoors",
    url: "posts/local-participation.html"
  },
  {
    title: "How elections turn votes into representation",
    category: "Elections",
    date: "2026-10-21",
    excerpt: "A clear introduction to ballots, vote counting, representation, and the systems that connect citizens with elected government.",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "A person placing a ballot into a ballot box",
    url: "posts/how-elections-work.html"
  },
  {
    title: "The role of public institutions",
    category: "Institutions",
    date: "2026-10-14",
    excerpt: "Public institutions establish rules, deliver services, and provide ways for communities to hold decision-makers accountable.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "A government building with columns",
    url: "posts/public-institutions.html"
  },
  {
    title: "The value of listening across differences",
    category: "Civic Life",
    date: "2026-10-08",
    excerpt: "Constructive civic dialogue begins with curiosity, careful listening, and a willingness to understand perspectives beyond our own.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "People gathered in conversation",
    url: "posts/listening-across-differences.html"
  },
  {
    title: "A community's voice in public decisions",
    category: "Community",
    date: "2026-09-29",
    excerpt: "Public meetings, local associations, and community initiatives can create meaningful opportunities to contribute to shared decisions.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "People gathered at a community event",
    url: "posts/community-public-decisions.html"
  },
  {
    title: "What makes information trustworthy?",
    category: "Civic Life",
    date: "2026-09-18",
    excerpt: "Practical ways to evaluate sources, check claims, and approach public-interest information with care and critical thinking.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Shelves of books in a library",
    url: "posts/trustworthy-information.html"
  }
];

const grid = document.getElementById("storyGrid");
const searchInput = document.getElementById("storySearch");
const filters = document.getElementById("categoryFilters");
const resultsLine = document.getElementById("resultsLine");
const emptyState = document.getElementById("emptyState");
let activeCategory = "All";

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function makeStoryCard(story) {
  const article = document.createElement("article");
  article.className = "story-card";

  const imageLink = document.createElement("a");
  imageLink.className = "card-image-link";
  imageLink.href = story.url;
  imageLink.setAttribute("aria-label", `Read ${story.title}`);

  const image = document.createElement("img");
  image.className = "card-image";
  image.src = story.image;
  image.alt = story.imageAlt || "";
  image.loading = "lazy";
  imageLink.appendChild(image);

  const body = document.createElement("div");
  body.className = "card-body";

  const category = document.createElement("p");
  category.className = "story-category";
  category.textContent = story.category;

  const heading = document.createElement("h3");
  heading.className = "card-title";

  const titleLink = document.createElement("a");
  titleLink.href = story.url;
  titleLink.textContent = story.title;
  heading.appendChild(titleLink);

  const excerpt = document.createElement("p");
  excerpt.className = "card-excerpt";
  excerpt.textContent = story.excerpt;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.textContent = formatDate(story.date);

  body.append(category, heading, excerpt, meta);
  article.append(imageLink, body);
  return article;
}

function renderStories() {
  const query = searchInput.value.trim().toLowerCase();

  const visibleStories = STORIES
    .filter(story => activeCategory === "All" || story.category === activeCategory)
    .filter(story => {
      const searchable = `${story.title} ${story.category} ${story.excerpt}`.toLowerCase();
      return searchable.includes(query);
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  grid.replaceChildren(...visibleStories.map(makeStoryCard));
  resultsLine.textContent = `${visibleStories.length} ${visibleStories.length === 1 ? "story" : "stories"}`;

  const noResults = visibleStories.length === 0;
  emptyState.hidden = !noResults;
  grid.hidden = noResults;
}

filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;
  filters.querySelectorAll(".filter-button").forEach(item => {
    const selected = item === button;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  renderStories();
});

searchInput.addEventListener("input", renderStories);

document.getElementById("clearFilters").addEventListener("click", () => {
  activeCategory = "All";
  searchInput.value = "";
  filters.querySelectorAll(".filter-button").forEach(button => {
    const selected = button.dataset.category === "All";
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  renderStories();
});

const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

primaryNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
renderStories();
