![deploy](https://github.com/novanix/apriltag-pdf-gen/actions/workflows/deploy.yml/badge.svg)
# AprilTag PDF Generator
A PDF generator for AprilTags built in Svelte

Printing out a large number of AprilTags becomes an issue due to the fact that they need to be dimensionally accurate, they usually need to be properly labeled, and you need a lot of them. To solve this, this project provides a web based GUI to generate or print a pdf filled with the tags. 

Along with producing tags, the project also allows for adding labels with the tag type, number, and dimensions, custom labels to a batch of tags, and color strips to the side of the tag to signify its purpose. 

Dimensional accuracy has been roughly tested in Firefox, so let me know if there are any issues in other browsers, or a better way to achieve dimensional accuracy.

The images used are pulled from [apriltag-imgs](https://github.com/AprilRobotics/apriltag-imgs).
