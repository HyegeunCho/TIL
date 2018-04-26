class Node {
    constructor(val) {
        this._val = val;
        this._parent = null;
        this._children = [];
    }

    isRoot() {
        return isValid(this._parent);
    }

    get chilren() {
        return this._children;
    }

    hasChildren() {
        return this._children.length > 0;
    }

    get value() {
        return this._val;
    }

    set value(val) {
        this._val = val;
    }

    append(child) {
        child._parent = this;
        this._children.push(child);
        return this;
    }

    toString() {
        return `Node (val: ${this._val}, children: ${this._children.length})`;
    }
}

class Tree {
    constructor(root) {
        this._root = root;
    }

    static map(node, fn, tree = null) {
        node.value = fn(node.value);
        if (tree === null) {
            tree = new Tree(node);
        }

        if (node.hasChildren()) {
            _.map(node.children, function(child) {
                Tree.map(child, fn, tree);
            });
        }
        return tree;
    }

    get root() {
        return this._root;
    }
}

