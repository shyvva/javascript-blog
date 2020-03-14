'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */
{
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');

        /*[DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /*[DONE] add class 'active' to the clicked link */

        clickedElement.classList.add('active');
        console.log('clickedElement:', clickedElement);

        /*[DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.post');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        /*[DONE] get 'href' attribute from the clicked link */

        const articleSelector = clickedElement.getAttribute('href');
        console.log(articleSelector);

        /*[DONE] find the correct article using the selector (value of 'href' attribute) */

        const articleTarget = document.querySelector(articleSelector);
        console.log(articleTarget);

        /*[DONE] add class 'active' to the correct article */

        articleTarget.classList.add('active');
        console.log('clickedElement:', articleTarget);
    }


    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {

        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        console.log(titleList);
        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);

        let html = '';

        for (let article of articles) {

            /* [DONE] get the article id */

            const articleId = article.getAttribute('id');

            /* [DONE] find the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* [DONE] get the title from the title element */

            const getTitle = article.getElementsByTagName('h3');
            /* [DONE] create HTML of the link */

            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log(linkHTML);

            /* [DONE] insert link into titleList */
            html = html + linkHTML;
            console.log(html);

        }
        titleList.innerHTML = html;
    }
    generateTitleLinks();
    
    const links = document.querySelectorAll('.titles a');
    console.log(links);
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
}