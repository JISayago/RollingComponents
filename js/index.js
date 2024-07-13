if ((!sessionStorage.getItem('vioHeroPage')) || (sessionStorage.getItem('vioHeroPage')==='false')) {
    sessionStorage.setItem('vioHeroPage', 'false');
    window.location.href = "./pages/heroPage.html"
}