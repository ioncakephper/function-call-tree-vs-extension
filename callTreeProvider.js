const vscode = require('vscode');

const TREE_DIRECTION = 'bottom-up'; // or 'top-down'

class TreeNode extends vscode.TreeItem {
  constructor(label, children = []) {
    super(
      label,
      children.length
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None,
    );
    this.children = children;
  }
}

class CallTreeProvider {
  constructor() {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.rootNodes = [];
    this.debounceTimer = null;
    this.debounceDelay = 300;

    this.subscribeToEditorEvents();
    this.refresh();
  }

  subscribeToEditorEvents() {
    vscode.window.onDidChangeActiveTextEditor(() => this.scheduleRefresh());
    vscode.workspace.onDidChangeTextDocument(() => this.scheduleRefresh());
  }

  scheduleRefresh() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.refresh(), this.debounceDelay);
  }

  refresh() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== 'javascript') {
      this.rootNodes = [];
      this._onDidChangeTreeData.fire();
      return;
    }

    const code = editor.document.getText();
    this.rootNodes = this.buildCallTree(code);
    this._onDidChangeTreeData.fire();
  }

  buildCallTree(code) {
    const functions = new Map();

    // Extract function bodies and calls
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

    // Build reverse links: who calls each function
    for (const [caller, { calls }] of functions.entries()) {
      for (const callee of calls) {
        const calleeFn = functions.get(callee);
        if (calleeFn) calleeFn.callers.add(caller);
      }
    }

    const visited = new Set();
    const buildNode = (name, useCallers) => {
      if (visited.has(name)) return null;
      visited.add(name);
      const info = functions.get(name);
      if (!info) return new TreeNode(name); // external

      const neighbors = useCallers ? info.callers : info.calls;
      const children = Array.from(neighbors)
        .map((n) => buildNode(n, useCallers))
        .filter(Boolean);

      return new TreeNode(name, children);
    };

    const useCallers = TREE_DIRECTION === 'bottom-up';

    // Roots: based on chosen direction
    const rootNames = [...functions.entries()]
      .filter(([_, data]) =>
        useCallers
          ? data.calls.size === 0
          : ![...functions.values()].some((f) => f.calls.has(_)),
      )
      .map(([name]) => name);

    return rootNames.map((name) => buildNode(name, useCallers)).filter(Boolean);
  }

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    return element ? element.children : this.rootNodes;
  }
}

module.exports = CallTreeProvider;
