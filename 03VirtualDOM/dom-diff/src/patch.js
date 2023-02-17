import { Element, render, setAttr } from './element';

let allPatches;
let index;

function patch(node, patches) {
    allPatches = patches;

    // 开始打补丁
    walk(node);
}