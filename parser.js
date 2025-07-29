const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const vscode = require('vscode');

async function parseProject(scope) {
  const functions = new Map();
  const files =
    scope === 'workspace'
      ? await vscode.workspace.findFiles('**/*.{js,ts}', '**/node_modules/**')
      : [vscode.window.activeTextEditor.document.uri];

  for (const fileUri of files) {
    const code = fs.readFileSync(fileUri.fsPath, 'utf8');
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    let currentFunc = null;
    traverse(ast, {
      FunctionDeclaration(path) {
        const name = path.node.id.name;
        registerFunction(name);
        currentFunc = name;
      },
      CallExpression(path) {
        if (!currentFunc) return;
        const callee = path.node.callee.name;
        if (callee) {
          registerFunction(callee);
          link(currentFunc, callee);
        }
      },
      'FunctionDeclaration:exit'(path) {
        currentFunc = null;
      },
    });
  }

  return { functions };

  function registerFunction(name) {
    if (!functions.has(name)) {
      functions.set(name, { callers: new Set(), callees: new Set() });
    }
  }

  function link(caller, callee) {
    const c = functions.get(caller);
    const d = functions.get(callee);
    c.callees.add(callee);
    d.callers.add(caller);
  }
}

module.exports = parseProject;
