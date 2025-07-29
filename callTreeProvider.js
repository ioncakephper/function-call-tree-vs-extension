const vscode = require('vscode');

class TreeNode extends vscode.TreeItem {
  constructor(label, children = [], type = 'function') {
    super(
      label,
      children.length
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None,
    );
    this.children = children;
    this.contextValue = type;

    this.iconPath = new vscode.ThemeIcon(
      type === 'function' ? 'symbol-function' : 'symbol-method',
    );
  }
}

class CallTreeProvider {
  constructor() {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.rootNodes = [];
    this.treeDirection = 'top-down';
    this.debounceTimer = null;

    vscode.window.onDidChangeActiveTextEditor(() => this.scheduleRefresh());
    vscode.workspace.onDidChangeTextDocument(() => this.scheduleRefresh());

    this.refresh();
  }

  toggleDirection() {
    this.treeDirection =
      this.treeDirection === 'top-down' ? 'bottom-up' : 'top-down';
  }

  scheduleRefresh() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.refresh(), 300);
  }

  refresh() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== 'javascript') {
      this.rootNodes = [];
      this._onDidChangeTreeData.fire();
      return;
    }

    const code = editor.document.getText();
    this.rootNodes = this.buildTree(code);
    this._onDidChangeTreeData.fire();
  }

  buildTree(code) {
    const functions = new Map();
    const functionRegex = /function\s+(\w+)\s*\(.*?\)\s*\{([\s\S]*?)\}/g;
    let match;
    while ((match = functionRegex.exec(code)) !== null) {
      const name = match[1];
      const body = match[2];
      const calls = Array.from(
        body.matchAll(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g),
      )
        .map((m) => m[1])
        .filter((fn) => fn !== name);
      functions.set(name, { calls: new Set(calls), callers: new Set() });
    }

    for (const [caller, { calls }] of functions.entries()) {
      for (const callee of calls) {
        const calleeFn = functions.get(callee);
        if (calleeFn) calleeFn.callers.add(caller);
      }
    }

    const visited = new Set();
    const buildNode = (name, reverse) => {
      if (visited.has(name)) return null;
      visited.add(name);
      const data = functions.get(name);
      if (!data) return new TreeNode(name); // external
      const related = reverse ? data.callers : data.calls;
      const children = Array.from(related)
        .map((n) => buildNode(n, reverse))
        .filter(Boolean);
      return new TreeNode(name, children);
    };

    const reverse = this.treeDirection === 'bottom-up';

    const rootNames = [...functions.keys()].filter((name) => {
      const data = functions.get(name);
      return reverse
        ? data.calls.size === 0
        : ![...functions.values()].some((f) => f.calls.has(name));
    });

    return rootNames.map((name) => buildNode(name, reverse)).filter(Boolean);
  }

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    return element ? element.children : this.rootNodes;
  }
}

module.exports = CallTreeProvider;
