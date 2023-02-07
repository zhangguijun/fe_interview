import { createElement, render, renderDom } from './element';


let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item', style:'color: green'}, ['周杰伦']),
    createElement('li', {class: 'item'}, ['林俊杰']),
    createElement('li', {class: 'item'}, ['王力宏'])
]);

console.log(virtualDom);


let el = render(virtualDom);
console.log(el)
renderDom(el, document.getElementById(
     'app'
))