const vscode = require('vscode');
const parseProject = require('./parser');

class FunctionNode extends vscode.TreeItem {
  constructor(
    label,
    children = [],
    collapsibleState = vscode.TreeItemCollapsibleState.Collapsed,
  ) {
    super(label, collapsibleState);
    this.children = children;
    this.contextValue = 'functionNode';
  }
}

class CallTreeProvider {
  constructor(state) {
    this.state = state;
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element) {
    return element;
  }

  async getChildren(element) {
    if (element) {
      // Return children of a FunctionNode
      return element.children;
    }

    // Root: rebuild graph and return top level nodes
    const graph = await parseProject(this.state.scope);
    const nodes = this._buildRoots(graph, this.state.orientation);
    return nodes;
  }

  _buildRoots(graph, orientation) {
    // graph = { functions: Map<id, { callers:Set, callees:Set }> }
    const roots = [];
    for (const [id, data] of graph.functions.entries()) {
      const isRoot =
        orientation === 'topDown'
          ? data.callers.size === 0
          : data.callees.size === 0;

      if (isRoot) {
        roots.push(this._buildNode(id, graph, orientation, new Set()));
      }
    }
    return roots;
  }

  _buildNode(id, graph, orientation, visited) {
    if (visited.has(id)) return null;
    visited.add(id);

    const data = graph.functions.get(id);
    const childrenIds =
      orientation === 'topDown'
        ? Array.from(data.callees)
        : Array.from(data.callers);

    const children = childrenIds
      .map((childId) =>
        this._buildNode(childId, graph, orientation, new Set(visited)),
      )
      .filter((n) => n !== null);

    return new FunctionNode(
      id,
      children,
      children.length
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None,
    );
  }
}

module.exports = CallTreeProvider;
