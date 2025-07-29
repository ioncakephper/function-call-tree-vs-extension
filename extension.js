const vscode = require('vscode');
const CallTreeProvider = require('./callTreeProvider');

/**
 *
 * @param context
 */
function activate(context) {
  const provider = new CallTreeProvider();

  // Register the view
  vscode.window.registerTreeDataProvider('callTree', provider);

  // 🔁 Register the toggle command
  let treeDirection = 'top-down'; // use let if you want to mutate

  const toggleDirectionCommand = vscode.commands.registerCommand(
    'callTree.toggleDirection',
    () => {
      treeDirection = treeDirection === 'top-down' ? 'bottom-up' : 'top-down';
      provider.setDirection(treeDirection); // you'll need to expose this in CallTreeProvider
      provider.refresh();
    },
  );

  context.subscriptions.push(toggleDirectionCommand);
}

/**
 *
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
