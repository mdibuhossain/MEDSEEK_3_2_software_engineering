const menu_button = document.querySelector("#menu_icon_container");
const responsive_nav_container = document.querySelector(".menu_container");
const menu_list = document.querySelectorAll(".menu_list");
const hamburger_icon = document.querySelector("#menu_icon_hamburger");
const cancel_icon = document.querySelector("#menu_icon_cancel");

const toggle_menu = () => {
  if (responsive_nav_container.classList.contains("show_menu_container")) {
    responsive_nav_container.classList.remove("show_menu_container");
    hamburger_icon.classList.remove("menu_icon_transform");
    cancel_icon.classList.add("menu_icon_transform");
  } else {
    cancel_icon.classList.remove("menu_icon_transform");
    hamburger_icon.classList.add("menu_icon_transform");
    responsive_nav_container.classList.add("show_menu_container");
  }
};

menu_list.forEach((list) => {
  if (list.classList.contains("menu_list"))
    list.addEventListener("click", toggle_menu);
});

cancel_icon.addEventListener("click", toggle_menu);

menu_button.addEventListener("click", toggle_menu);
