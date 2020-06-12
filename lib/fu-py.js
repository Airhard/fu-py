'use babel';

import FuPyView from './fu-py-view';
import { CompositeDisposable } from 'atom';

export default {

  fuPyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fuPyView = new FuPyView(state.fuPyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fuPyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fu-py:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fuPyView.destroy();
  },

  serialize() {
    return {
      fuPyViewState: this.fuPyView.serialize()
    };
  },

  toggle() {
    console.log('FuPy was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
