document.addEventListener('DOMContentLoaded', () => {
    // 1. A lista de imagens (wallpapers)
    const images = [
        "carrossel/images/wp9048980-kaiju-universe-wallpapers.jpg",
        "carrossel/images/wp9100754-battra-wallpapers.jpg",
        "carrossel/images/wp11723047-kaiju-universe-wallpapers.jpg",
        "carrossel/images/wp11723048-kaiju-universe-wallpapers (1).jpg",
        "carrossel/images/wp11723048-kaiju-universe-wallpapers.jpg",
        "carrossel/images/wp11723109-kaiju-universe-wallpapers.jpg",
        "carrossel/images/wp11723164-kaiju-universe-wallpapers.jpg",
    ];

    const carouselContainer = document.getElementsByClassName('background-carousel');
    let currentIndex = 0;
    const intervalTime = 8000;


    function setBackgroundImage() {
        if (images.length === 0) return;

        Array.from(carouselContainer).forEach(function(container) {
            container.style.backgroundImage = `url('${images[currentIndex]}')`;
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        setBackgroundImage();
    }

    setBackgroundImage();

    setInterval(nextImage, intervalTime);
});