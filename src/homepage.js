import Logo from "./assets/check-solid.svg";
import GithubLogo from "./assets/github-brands.svg";
import inboxIcon from "./assets/inbox-solid.svg";
import todayIcon from "./assets/calendar-day-solid.svg";
import weekIcon from "./assets/calendar-week-solid.svg";
import addIcon from "./assets/calendar-plus-solid.svg";

const header = () => {
  const header = document.createElement("header");
  const logo = document.createElement("div");
  logo.classList.add("logo");
  const title = document.createElement("div");
  title.classList.add("title");

  const logoImage = document.createElement("img");
  logoImage.src = Logo;
  logo.appendChild(logoImage);

  const titleContent = document.createElement("h1");
  titleContent.textContent = "Just Do It!";
  title.appendChild(titleContent);

  header.appendChild(logo);
  header.appendChild(title);

  return header;
};

const footer = () => {
  const footer = document.createElement("footer");
  footer.textContent = "Realized by MohamedSayhii";

  const githubLink = document.createElement("a");
  const githubIcon = document.createElement("img");

  githubLink.href = "https://github.com/mohamedsayhii";
  githubIcon.src = GithubLogo;
  githubLink.appendChild(githubIcon);

  footer.appendChild(githubLink);

  return footer;
};

function createSideBarElement(icon, text) {
  const div = document.createElement("div");
  div.classList.add("sidebar-element");
  const image = document.createElement("img");
  image.src = icon;
  const h4 = document.createElement("h4");
  h4.textContent = text;
  div.appendChild(image);
  div.appendChild(h4);

  return div;
}

const sideBar = () => {
  const sideBar = document.createElement("div");
  sideBar.classList.add("sidebar");
  sideBar.appendChild(createSideBarElement(inboxIcon, "Inbox"));
  sideBar.appendChild(createSideBarElement(todayIcon, "Today"));
  sideBar.appendChild(createSideBarElement(weekIcon, "Week"));

  const h4 = document.createElement("h4");
  h4.textContent = "Projects";

  sideBar.appendChild(h4);
  sideBar.appendChild(createSideBarElement(addIcon, "Add Project"));

  return sideBar;
};

const inbox = () => {
  const inbox = document.createElement("div");
  inbox.classList.add("inbox");
  inbox.textContent = "Inbox";
  return inbox;
};

const main = () => {
  const mainContent = document.createElement("main");
  mainContent.appendChild(sideBar());
  mainContent.appendChild(inbox());

  return mainContent;
};

const homePage = () => {
  const body = document.querySelector("body");
  body.appendChild(header());
  body.appendChild(main());
  body.appendChild(footer());
};

export default homePage;
