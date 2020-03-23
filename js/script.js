'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */
{
  // const select.all.articles = '.post',
  //   select.article.title = '.post-title',
  //   select.listOf.titles = '.titles',
  //   select.article.tags = '.post-tags .list',
  //   select.article.author = '.post-author',
  //   select.listOf.tags = '.tags',
  //   select.listOf.authors = '.authors',
  //   opts.tagSizes.count = 5,
  //   opts.tagSizes.classPrefix = 'tag-size-';

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
      title: '.post-title',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  let txtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  txtRotate.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
      let toRotate = elements[i].getAttribute('data-rotate');
      let period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new txtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }

  };



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
  };

  function generateTitleLinks(customSelector = '') {
    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(select.listOf.titles);

    /* [DONE] for each article */

    const articles = document.querySelectorAll(select.all.articles + customSelector);
    let html = '';

    for (let article of articles) {

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */

      const articleTitle = article.querySelector(select.article.title).innerHTML;

      /* [DONE] get the title from the title element */

      const getTitle = article.getElementsByTagName('h3');

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into titleList */

      html = html + linkHTML;

    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  function calculateTagsParams(tags) {

    const params = {
      max: 0,
      min: 999999,
    };

    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }

    return params;
  }

  calculateTagsParams();

  function claculateTagClass(count = 5) {
    const params = {
      min: 2,
      max: 10,
    };


    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);

    return opts.tagSizes.classPrefix + classNumber;
  }
  claculateTagClass();



  function generateTags() {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};

    /*[DONE] find all articles */

    const titleList = document.querySelector(select.listOf.titles);
    console.log(titleList);

    /*[DONE] START LOOP: for every article: */

    const articles = document.querySelectorAll(select.all.articles);

    for (let article of articles) {

      /*[DONE] find tags wrapper */

      const tagWrapper = article.querySelector(select.article.tags);

      /*[DONE] make html variable with empty string */

      let html = '';

      /*[DONE] get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /*[DONE] split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /*[DONE] START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        console.log(tag);

        /*[DONE] generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>' + ' ';
        console.log(linkHTML);

        /*[DONE] add generated code to html variable */

        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */

        if (!allTags[tag]) {

          /* [NEW] add tag to allTags object */

          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /*[DONE] END LOOP: for each tag */
      }

      /*[DONE] insert HTML of all the links into the tags wrapper */

      tagWrapper.innerHTML = html;

      /*[DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */

    const tagList = document.querySelector(select.listOf.tags);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    /* [NEW] create variable for all links HTML code */

    let allTagsHTML = '';


    /* [NEW] START LOOP: for each tag in allTags: */

    for (let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */

      allTagsHTML += '<li><a class="' + claculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + ' " ><span>' + tag + '</span></a>' + '</li>';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
    console.log(allTags);

  }


  generateTags();

  function tagClickHandler(event) {
    /*[DONE] prevent default action for this event */

    event.preventDefault();

    /*[DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /*[DONE] make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /*[DONE] find all tag links with class active */

    const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /*[DONE] START LOOP: for each active tag link */

    for (let tagLink of tagActiveLinks) {

      /* remove class active */

      tagLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
    /*[DONE] find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href="' + href + '"');

    /*[DONE] START LOOP: for each found tag link */

    for (let tagAddLink of tagLinks) {

      /* add class active */

      tagAddLink.classList.add('active');
      console.log('Click', tagAddLink);

      /* END LOOP: for each found tag link */

    }
    /*[DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {

    /*[DONE] find all links to tags */

    const tagClickLinks = document.querySelectorAll(select.all.linksTo.tags);
    /*[DONE] START LOOP: for each link */

    for (let link of tagClickLinks) {

      /* add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */

    }
  }

  addClickListenersToTags();




  function generateAuthors() {
    /* [NEW] create a new variable allAuthors with an empty array */
    let allAuthors = {};

    /*[DONE] find all articles */

    const titleList = document.querySelector(select.listOf.titles);

    /*[DONE] START LOOP: for every article: */

    const articles = document.querySelectorAll(select.all.articles);

    for (let article of articles) {

      /*[DONE] find author wrapper */

      const authorWrapper = article.querySelector(select.article.author);

      /*[DONE] make html variable with empty string */

      let html = '';

      /*[DONE] get author from data-author attribute */

      const articleAuthors = article.getAttribute('data-author');
      console.log(articleAuthors);

      /*[DONE] generate HTML of the link */

      const linkHTML = '<p><a href="#author-' + articleAuthors + '"><span>' + articleAuthors + '</span></a></p>' + ' ';
      console.log(linkHTML);

      /*[DONE] add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */

      if (!allAuthors[articleAuthors]) {

        /* [NEW] add tag to allTags object */

        allAuthors[articleAuthors] = 1;
      }

      /*[DONE] insert HTML of all the links into the tags wrapper */

      authorWrapper.innerHTML = html;

      /*[DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of authors in right column */

    const authorsList = document.querySelector(select.listOf.authors);

    /* [NEW] create variable for all links HTML code */

    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each author in allAuthors: */

    for (let author in allAuthors) {

      /* [NEW] generate code of a link and add it to allTagsHTML */

      allAuthorsHTML += '<li><a href="#author-' + author + '"><span>' + author + '</span></a></li>' + ' ';


    }
    /* [NEW] END LOOP: for each author in allAuthors: */

    /*[NEW] add HTML from allAuthorsHTML to authorsList */
    authorsList.innerHTML = allAuthorsHTML;
    console.log(allAuthors);
  }


  generateAuthors();


  function authorClickHandler(event) {

    /*[DONE] prevent default action for this event */

    event.preventDefault();

    /*[DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /*[DONE] make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');

    /*[DONE] find all author links with class active */

    const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /*[DONE] START LOOP: for each active author link */

    for (let authorLink of authorActiveLinks) {

      /*[DONE] remove class active */

      authorLink.classList.remove('active');

      /*[DONE] END LOOP: for each active author link */
    }

    /*[DONE] find all author links with "href" attribute equal to the "href" constant */

    const authorLinks = document.querySelectorAll('a[href="' + href + '"');

    /*[DONE] START LOOP: for each found author link */

    for (let authorAddLink of authorLinks) {

      /*[DONE] add class active */

      authorAddLink.classList.add('active');
      console.log('Click', authorAddLink);

      /*[DONE] END LOOP: for each found author link */
    }
    /*[DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');
  }


  function addClickListenersToAuthor() {

    /*[DONE] find all links to author */

    const authorClickLinks = document.querySelectorAll(select.all.linksTo.authors);

    /*[DONE] START LOOP: for each link */

    for (let link of authorClickLinks) {

      /*[DONE] add tagClickHandler as event listener for that link */

      link.addEventListener('click', authorClickHandler);

      /*[DONE] END LOOP: for each link */
    }
  }

  addClickListenersToAuthor();
}

