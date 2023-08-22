// insertWidget.js

async function createLinkList({ projectSource, supabaseUrl, apikey }) {
  return fetch(
    `${supabaseUrl}/rest/v1/components?project_source=eq.${projectSource}`,
    {
      headers: {
        apikey,
      },
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((json) => json);
}

function initialize(params) {
  let canInit = false;
  Object.entries(params).forEach(([key, value]) => {
    if (!value) {
      console.error(`${key} must be defined.`);
      return;
    }
    canInit = true;
  });

  if (!canInit) {
    return;
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const { projectSource, supabaseUrl, apikey } = params;
    const linkList = await createLinkList({
      projectSource,
      supabaseUrl,
      apikey,
    });

    if (!linkList || linkList.length === 0) {
      console.warn("No entries found for this project name.");
      return;
    }

    const fabButton = document.createElement("button");
    fabButton.classList.add("my-fab-button");
    fabButton.textContent = "+";
    document.body.appendChild(fabButton);

    const linkListUl = document.createElement("ul");
    linkListUl.classList.add("my-link-list");

    linkList.forEach((item) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      const category = document.createElement("span");
      anchor.textContent = item.component_name;
      category.textContent = item.component_category;
      anchor.href = item.url;
      anchor.target = "_blank";
      listItem.appendChild(anchor);
      listItem.appendChild(category);
      linkListUl.appendChild(listItem);
    });

    const closeButton = document.createElement("button");
    closeButton.classList.add("my-close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", togglelinkListUl);

    linkListUl.appendChild(closeButton);
    document.body.appendChild(linkListUl);
    function togglelinkListUl() {
      linkListUl.classList.toggle("show");
    }

    fabButton.addEventListener("click", () => togglelinkListUl());

    const style = `
    *{
      z-index: 999999999999999999999999999999;
      font-family: Arial, Helvetica, sans-serif!important;
    }
      .my-fab-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #00b0bb;
        border-radius: 12px;
        font-size: 24px;
        color: white;
        border: none;
        outline: none;
        cursor: pointer;
      }
      
      .my-link-list {
        position: fixed;
        bottom: 52px;
        right: 64px;
        padding: 16px;
        background-color: #fff;
        border: 1px solid #00b0bb;
        border-radius: 5px;
  
        transform-origin: bottom right;
        transform: scale(0); /* Start with scale 0 to hide the list */
        transition: transform 0.3s ease; /* Smooth transition for scale */
      }

      .my-link-list.show {
        transform: scale(1);
      }
      
      .my-link-list li {
        list-style: none;
        margin-bottom: 8px;
      }
      
      .my-link-list li:last-child {
        margin-bottom: 0;
      }
      
      .my-link-list li a {
        color: #333;
        text-decoration: none;
      }
  
      .my-link-list li a:hover {
        color: #00b0bb;
      }
      
      .my-close-button {
        position: absolute;
        top: -10px;
        left: -10px;
        width: 20px;
        height: 20px;
        background-color: #00b0bb;
        border-radius: 50%;
        font-size: 12px;
        color: white;
        border: none;
        outline: none;
        cursor: pointer;
      }
    `;

    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    document.head.appendChild(styleElement);
  });
}
