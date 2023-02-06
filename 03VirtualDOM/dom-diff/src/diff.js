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

    if(!newNode) {
        current.push({
            type: 'REMOVE', index
        })
    } else if(isString(oldNode) && isString(newNode)) {
        if(oldNode !== newNode) {
            current.push({type: 'TEXT', index})
        }
    } else if(oldNode.type === newNode.type) {
        // 比较属性是否有更改
        let attr = diffAttr(oldNode.props, newNode.props);

        if()
    }   
}


function isString (node) {
    return typeof node === 'string'
}
