// ==UserScript==
// @name         Yahoo News Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Filter news to remove news from a specific category or source
// @author       Ryan Duquet
// @match        https://news.yahoo.com/*
// @icon         https://www.google.com/s2/favicons?domain=yahoo.com
// @grant        none
// ==/UserScript==

const categoriesToRemove = []; //enter categories that you would like to remove inside "" and with commas separating each category
const sourcesToRemove = []; //enter sources here in the same format as categories
//sources we removed and their article titles
let badSources = [];
//categories we removed and their article titles
let badCategories = [];

//retrieve all of the sources and add event listener for scrolling to update the list of sources of articles
let allSources = document.getElementsByClassName("C(#959595) Fz(11px) D(ib) Mb(6px)");
let allCategories = document.getElementsByClassName("Fz(12px) Fw(b) Tt(c) D(ib) Mb(6px)");

window.addEventListener('scroll', (event) => {
    allSources = document.getElementsByClassName("C(#959595) Fz(11px) D(ib) Mb(6px)");
    allCategories = document.getElementsByClassName("Fz(12px) Fw(b) Tt(c) D(ib) Mb(6px)");

    function removeArticleBySource(sourcesToRemove) {
        console.log(badSources);
        for (let allSourcesIndex = 0; allSourcesIndex < allSources.length; allSourcesIndex++) {
            if (sourcesToRemove.includes(allSources[allSourcesIndex].textContent)) {
                badSources.push("Source: " + allSources[allSourcesIndex].textContent + ", Title: " + allSources[allSourcesIndex].parentElement.children[2].textContent);
                allSources[allSourcesIndex].parentElement.parentElement.parentElement.parentElement.remove();
            }
        }
    }

    function removeArticleByCategory(categoriesToRemove) {
        console.log(badCategories);
        for (let allCategoriesIndex = 0; allCategoriesIndex < allSources.length; allCategoriesIndex++) {
            //check if categoriesToRemove contains the current index of allCategories AND the source is not already to be removed
            if (categoriesToRemove.includes(allCategories[allCategoriesIndex].textContent) && !sourcesToRemove.includes(allCategories[allCategoriesIndex].parentElement.children[1].textContent)) {
                badCategories.push("Category: " + allCategories[allCategoriesIndex].textContent + ", Title: " + allCategories[allCategoriesIndex].parentElement.children[2].textContent);
                allCategories[allCategoriesIndex].parentElement.parentElement.parentElement.parentElement.remove();
            }
        }
    }

    removeArticleBySource(sourcesToRemove);
    removeArticleByCategory(categoriesToRemove);
});