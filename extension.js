const vscode = require('vscode');
const CallTreeProvider = require('./callTreeProvider');



function activate(context) {
  const provider = new CallTreeProvider();

  vscode.window.registerTreeDataProvider('callTree', provider);

  context.subscriptions.push(
    vscode.commands.registerCommand('callTree.toggleDirection', () => {
      provider.toggleDirection();
      provider.refresh();
    }),
  );
}


/**
 *
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
