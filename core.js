import * as TagManager from "./tagManager.js";
import * as ConfigHandler from "./configHandler.js";

export const imageRepo = "https://github.com/AprilRobotics/apriltag-imgs/blob/master/"; 

export let config = ConfigHandler.getDefaultConfig(); 

TagManager.createCards(0, 10, config);

// Some extra code to set the width of the scrollbar on the page

let pages = document.getElementById("pages");
//let scrollbarWidth = pages.offsetWidth - pages.clientWidth;

//pages.style.setProperty("--scrollbar-width", scrollbarWidth + "px");
