const vscode = require('vscode');
const CallTreeProvider = require('./callTreeProvider');

let provider;

/**
 *
 * @param context
 */
function activate(context) {
  // Shared state: orientation + scope
  const state = {
    orientation: 'topDown', // or 'bottomUp'
    scope: 'file', // or 'workspace'
  };

  provider = new CallTreeProvider(state);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('callTreeView', provider),
    vscode.commands.registerCommand('callTreeViewer.refresh', () =>
      provider.refresh(),
    ),
    vscode.commands.registerCommand('callTreeViewer.toggleOrientation', () => {
      state.orientation =
        state.orientation === 'topDown' ? 'bottomUp' : 'topDown';
      provider.refresh();
    }),
    vscode.commands.registerCommand('callTreeViewer.toggleScope', () => {
      state.scope = state.scope === 'file' ? 'workspace' : 'file';
      provider.refresh();
    }),
  );
}

/**
 *
 */
function deactivate() {}

module.exports = { activate, deactivate };
