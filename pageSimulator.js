// Right now printing out webpages is a pain
// Content clips contantly, and its hard to order things nicely
// Additionally, showing a preview of the page is difficult
// This module simulates how the contents of the page are laid out, and makes multi-page printing easier

const pageTemplate = document.getElementById("page-template");
const pageHolder = document.getElementById("pages");

const root = document.querySelector(':root');

function createNewPage()
{
    let page = pageTemplate.content.firstElementChild.cloneNode(true);
    pageHolder.append(page);
    return page;
}

let pages = [createNewPage()];

const ppi = 96; // Pixels per inch
let pageWidth = 8.5; // The final page width in inches
let pageHeight = 11; // The final page height in inches

let scale; // The scale of the preview

function setScale(newScale)
{
    scale = newScale;
    root.style.setProperty("--sim-scale", scale);
}

setScale(pages[0].clientWidth / (pageWidth * ppi));

let resizeObserver = new ResizeObserver((entries) => {
    setScale(pages[0].clientWidth / (pageWidth * ppi));
});

resizeObserver.observe(pageHolder);

export function showTags(tags)
{
    clearPages();

    if (tags.length > 0)
    {
        pages[0].append(tags[0]); // Add the tag to the first page to get the dimensions of the tag

        let tagWidth = tags[0].clientWidth;
        let tagHeight = tags[0].clientHeight;

        let pagesPerX = Math.floor(pages[0].clientWidth / tagWidth);
        let pagesPerY = Math.floor(pages[0].clientHeight / tagHeight);
        let tagsPerPage = pagesPerX * pagesPerY;

        console.log("Tag width: " + tagWidth + "px");
        console.log("Tag height: " + tagHeight + "px");

        console.log("Tags per x: " + pagesPerX);
        console.log("Tags per y: " + pagesPerY);
        console.log("Tags per page: " + tagsPerPage);

        let currentPage = pages[0];
        let addedTags = 0; // The number of tags added to the current page
        for (let tag of tags)
        {
            if (addedTags >= tagsPerPage)
            {
                currentPage = createNewPage();
                pages.push(currentPage);
                addedTags = 0;
            }
    
            currentPage.append(tag);
            addedTags++;
        }
    
    }   

}

export function clearPages()
{
    for (let page of pages)
    {
        page.remove();
    }

    pages = [createNewPage()];
}

