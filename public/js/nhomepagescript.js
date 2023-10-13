window.addEventListener("scroll", function () {
    var scrolled = window.scrollY;

    if (scrolled > 50) {
        document.getElementById("navbar").classList.add("sticky");
    } else {
        document.getElementById("navbar").classList.remove("sticky");
    }
});


