

const APP = document.querySelector('#app');

class BaseRouter {
    constructor(router) {
        this.routes = router;
    }

    render(path) {
        let curRoute = this.routes.find(
            (route) => route.path === path
        );
        if (!curRoute) {
            // 当前URL中的hash不存在的时候，默认取第一个，当然真实场景下，可能会有各种情况，取决于业务逻辑
            curRoute = this.routes.find((route) => route.path === "/");
        }
        const { component } = curRoute;
        APP.innerHTML = component;
    }

}

export { BaseRouter };