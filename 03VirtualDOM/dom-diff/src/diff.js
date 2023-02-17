/**
 * 
 * @param {*} oldTree 
 * @param {*} newTree
 * 比较两个对象，找出不同 
 */
 function diff(oldTree, newTree) {
    let patches = {};
    let index = 0;

    treeWalker(oldTree, newTree, index, patches);

    return patches;

}


function treeWalker(oldNode, newNode, index, patches) {

    let current = [];

    if (!newNode) {
        current.push({
            type: 'REMOVE', index
        })
    } else if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) {
            current.push({ type: 'TEXT', index })
        }
    } else if (oldNode.type === newNode.type) {
        // 比较属性是否有更改
        let attr = diffAttr(oldNode.props, newNode.props);

        if (Object.keys(attr).length > 0) {
            current.push({ type: "ATTR", attr })
        }

        diffChildren(oldNode.children, newNode.children, patches)
    } else {
        current.push({ type: 'REPLACE', newNode })
    }

    if (current.length) {
        patches[index] = current
    }
}


function isString(node) {
    return typeof node === 'string'
}

function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    // 比较老新属性是否相同
    for (const key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key]
        }
    }
    // 把不存在老属性的新属性 
    for (const key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key]
        }
    }
    return patch;
}


let num = 0;


function diffChildren(oldChild, newChild, patches) {

    oldChild.forEach((child, index) => {
        treeWalker(child, newChild, ++num, patches)
    });
}


export default diff;