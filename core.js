import * as TagManager from "./tagManager.js";
import * as ConfigHandler from "./configHandler.js";

export const imageRepo = "https://github.com/AprilRobotics/apriltag-imgs/blob/master/"; 

export let config = ConfigHandler.getDefaultConfig(); 

for (let i = 0; i < 10; i++)
{
	TagManager.createCard(i, config);
}

