export default class TreeNode<T> {
  public parent: TreeNode<T> | null = null;
  public children: TreeNode<T>[] = [];
  public value: T;

  constructor(value: T) {
    this.value = value;
  }

  addChild(child: TreeNode<T>) {
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child: TreeNode<T>) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }
  }
}
