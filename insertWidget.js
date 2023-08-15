// insertWidget.js
document.addEventListener("DOMContentLoaded", function () {
  const fabButton = document.createElement("button");
  fabButton.classList.add("my-fab-button");
  fabButton.textContent = "+";
  document.body.appendChild(fabButton);

  let linkList = null;

  function createLinkList() {
    linkList = document.createElement("ul");
    linkList.classList.add("my-link-list");

    const links = [
      { text: "Text field", url: "http://localhost:6006/?path=/docs/inputs-text-fields-lemonade--docs" },
      { text: "Button", url: "http://localhost:6006/?path=/docs/inputs-buttons-lemonade--docs" },
      { text: "Radio group", url: "http://localhost:6006/?path=/docs/inputs-radiogroup-lemonade--docs" },
    ];

    links.forEach((link) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.textContent = link.text;
      anchor.href = link.url;
      anchor.target = "_blank"
      listItem.appendChild(anchor);
      linkList.appendChild(listItem);
    });

    const closeButton = document.createElement("button");
    closeButton.classList.add("my-close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
      linkList.style.transform =
        linkList.style.transform === "scale(1)" ? "scale(0)" : "scale(1)";
    });

    linkList.appendChild(closeButton);

    return linkList;
  }

  function toggleLinkList() {
    if (!linkList) {
      linkList = createLinkList();
      document.body.appendChild(linkList);
    }

    requestAnimationFrame(() => {
      // Add a slight delay before toggling the scale to allow the transition to work on the first click
      setTimeout(() => {
        linkList.style.transform =
          linkList.style.transform === "scale(1)" ? "scale(0)" : "scale(1)";
      }, 10);
    });
  }

  fabButton.addEventListener("click", toggleLinkList);

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
