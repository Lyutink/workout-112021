import './sass/main.scss';
import './css/common.css';
import NewsApiService from './js/components/news-service';
import articlesTpl from './templates/articles.hbs';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
}

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.query.value;
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(appendArticlesMarkup);
}

function onLoadMore() {
    newsApiService.fetchArticles().then(appendArticlesMarkup);
}

function appendArticlesMarkup(articles) {
    refs.articlesContainer.insertAdjacentElementHTML('beforebegin', articlesTpl
        (articles));
}

