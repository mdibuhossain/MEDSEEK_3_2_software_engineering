function DOM() {
  const menu_button = document.querySelector("#menu_icon_container");
  const responsive_nav_container = document.querySelector(".menu_container");
  const menu_list = document.querySelectorAll(".menu_list");
  const hamburger_icon = document.querySelector("#menu_icon_hamburger");
  const cancel_icon = document.querySelector("#menu_icon_cancel");
  const searchBox = document.querySelector(".search-box");
  const searchResultContainer = document.querySelector(
    ".realtime-search-result-container"
  );

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

  const fetchAndSuggestResult = async (e) => {
    const keyword = e.target.value.trim();
    if (keyword.length > 0) {
      const fetch_data = await fetch(`/api/medicine/search/${keyword}`);
      const data = await fetch_data.json();
      processDataInSearchResult(data);
    } else {
      searchResultContainer.innerHTML = ``;
    }
  };

  const processDataInSearchResult = (data) => {
    searchResultContainer.innerHTML = ``;
    try {
      data?.forEach((med) => {
        const medCart = document.createElement("div");
        medCart.setAttribute("key", med?._id);
        medCart.classList.add("search-med-cart");
        medCart.onclick = handleOnClickResult;
        medCart.innerHTML = `
        <p>${med?.name} <span class="medicine-strength">${med?.strength}</span></p>
        <p class="search-result-common-text medicine-type">${med?.type}</p>
        <p class="search-result-common-text">${med?.generic}</p>
        <p class="search-result-common-text">${med?.company}</p>
    `;
        searchResultContainer.appendChild(medCart);
      });
    } catch {}
  };

  const handleOnClickResult = (e) => {
    const parentElement = e.target.parentElement;
    const attrsName = parentElement.getAttributeNames();
    let ID = "";
    attrsName.forEach((at) => {
      if (at === "key") ID = parentElement.getAttribute(at);
    });
  };

  menu_list.forEach((list) => {
    if (list.classList.contains("menu_list"))
      list.addEventListener("click", toggle_menu);
  });

  cancel_icon.addEventListener("click", toggle_menu);

  menu_button.addEventListener("click", toggle_menu);

  searchBox.addEventListener("input", fetchAndSuggestResult);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", DOM);
} else {
  DOM();
}
