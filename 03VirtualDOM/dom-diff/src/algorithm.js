/***
 *  树， 在一颗树中，除了根节点外，其他节点有且只有一个父节点
 *  先序遍历： 先访问根节点，然后遍历左子树，最后遍历右子树
 *  后序遍历： 先遍历左子树，然后遍历右子树，最后访问根节点
 */



 var root = {
    value: "A",
    children: [
      {
        value: "B",
        children: [
          {
            value: "D",
            children: [],
          },
          {
            value: "E",
            children: [],
          },
        ],
      },
      {
        value: "C",
        children: [
          {
            value: "F",
            children: [],
          },
        ],
      },
    ],
  }