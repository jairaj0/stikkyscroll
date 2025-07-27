const track = document.querySelector('.carousel-track');
const container = document.querySelector('.carousel-container');

let currentIndex = 0;
let isLoading = false;
let isScrolling = false;
let images = [];

const fetchAnimeImage = async () => {
    if (isLoading) return;
    isLoading = true;

    try {
        const res = await fetch("https://nekos.best/api/v2/neko");
        const data = await res.json();
        const imageUrl = data.results[0].url;
        images.push(imageUrl);

        const newItem = document.createElement('div');
        newItem.className = 'carousel-item';

        const img = document.createElement('img');
        img.src = imageUrl;

        newItem.appendChild(img);
        track.appendChild(newItem);
    } catch (err) {
        console.error("Failed to load image:", err);
    } finally {
        isLoading = false;
    }
};

const updateCarousel = () => {
    track.style.transform = `translateY(-${currentIndex * 100}vh)`;
};

const handleWheel = (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0) {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateCarousel();
        }
        if (currentIndex > images.length - 3) {
            fetchAnimeImage();
        }
    } else {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, 1000); // Match transition duration
};

const initializeCarousel = async () => {
    for (let i = 0; i < 5; i++) {
        await fetchAnimeImage();
    }
};

container.addEventListener('wheel', handleWheel);

initializeCarousel();