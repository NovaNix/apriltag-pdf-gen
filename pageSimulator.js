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

        let pageDimensions = getContentDimensions(pages[0]);

        let tagWidth = tags[0].clientWidth;
        let tagHeight = tags[0].clientHeight;

        let pagesPerX = Math.floor(pageDimensions.width / tagWidth);
        let pagesPerY = Math.floor(pageDimensions.height / tagHeight);
        let tagsPerPage = pagesPerX * pagesPerY;

        console.log("Page dimensions: " + pageDimensions.width + "x" + pageDimensions.height);

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

function getContentDimensions(element)
{
    // Code borrowed from https://stackoverflow.com/questions/25197184/get-the-height-of-an-element-minus-padding-margin-border-widths

    let cs = getComputedStyle(element);

    let paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    let paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

    let borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    let borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

    // Element width and height minus padding and border
    let elementWidth = element.offsetWidth - paddingX - borderX;
    let elementHeight = element.offsetHeight - paddingY - borderY;

    return {width: elementWidth, height: elementHeight};
}

export function clearPages()
{
    for (let page of pages)
    {
        page.remove();
    }

    pages = [createNewPage()];
}

