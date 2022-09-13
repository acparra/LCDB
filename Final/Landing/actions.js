let btn = document.getElementById("navbar_button");
let menu = document.querySelector(".navbar_items");
let item = document.querySelectorAll(".navbar_item");

btn.addEventListener("click", () => {
    menu.classList.toggle("show");
    menu.classList.toggle("hide");
});


item.forEach(element => element.addEventListener("click", (e) => {
    if (menu.classList.contains("show")) {
        menu.classList.toggle("hide");
        menu.classList.toggle("show");
    }
})
)


