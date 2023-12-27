const menu_button = document.querySelector("#menu_icon_container");
const responsive_nav_container = document.querySelector(".menu_container");
const menu_list = document.querySelectorAll(".menu_list");

const toggle_menu = () => {
  if (responsive_nav_container.classList.contains("show_menu_container")) {
    responsive_nav_container.classList.remove("show_menu_container");
  } else {
    console.log(responsive_nav_container.classList);
    responsive_nav_container.classList.add("show_menu_container");
  }
};

menu_list.forEach((list) => {
  list.addEventListener("click", toggle_menu);
});

menu_button.addEventListener("click", toggle_menu);
