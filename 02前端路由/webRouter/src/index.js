import { HashRouter } from './hsah';
import { HistoryRouter } from './history';
import { router }  from './route';
//路由模式
const MODE = 'history';
class WebRouter {
    constructor({ mode = 'hash', routeList }) {
        this.router = mode === 'hash' ? new HashRouter(routeList) : new HistoryRouter(routeList);
    }
    push(path) {
        this.router.push(path);
    }
    replace(path) {
        this.router.replace(path);
    }
}

const webRouter = new WebRouter({
    mode: MODE,
    routeList: router
});

document.querySelector('.btn-list').addEventListener('click', e => {
    const event = e || window.event;
    if (event.target.tagName === 'LI') {
        const url = event.target.dataset.url;
        !url.indexOf('/') ? webRouter.push(url) : webRouter.go(url);
    }
});

// document.querySelector('.replace-btn').addEventListener('click', e => {
//     webRouter.replace('/');
// });
