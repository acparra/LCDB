let btn = document.getElementById("navbar_button");
let menu = document.querySelector(".navbar_items");
let item = document.querySelectorAll(".navbar_item");

console.log(item)

btn.addEventListener("click", () => {
    menu.classList.toggle("show");
    menu.classList.toggle("hide");
});


item.forEach(element => element.addEventListener("click", (e) => {
    console.log(e);
    if (menu.classList.contains("show")) {
        menu.classList.toggle("hide");
        menu.classList.toggle("show");
    }
})
)


