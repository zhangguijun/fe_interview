// 创建虚拟dom 以及将虚拟dom 渲染成真实的dom

class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
/**
 * 
 * @param {*} type  元素类型 div li p span
 * @param {*} props 元素上的属性， class style
 * @param {*} children 指元素是否有有子节点，参数以数组的形式传入
 * @returns 
 */
function createElement(type, props, children) {
    return new Element(type, props, children)
}

function render(vDom) {
    // 跟具type 来创建对应的元素
    let el = document.createElement(vDom.type);
    // 遍历props 然后给el 设置属性
    for (const key in vDom.props) {
        setAttr(el, key, vDom.props[key])
    }

    // 遍历子节点

    vDom.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);

        el.appendChild(child);
    });

    return el;
}

function setAttr(node, key, value) {
    switch (key) {
        case 'value':
            // node是一个input或者textarea就直接设置其value即可
            if (node.tagName.toLowerCase() === 'input' ||
                node.tagName.toLowerCase() === 'textarea') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}

function renderDom(el, target) {
    target.appendChild(el)
}

export {
    Element,
    createElement, render, renderDom, setAttr
}