'use strict';

var DOMChildrenOperations = require('react/lib/DOMChildrenOperations');
var DOMPropertyOperations = require('react/lib/DOMPropertyOperations');
var ReactPerf = require('react/lib/ReactPerf');
var Mount = require('./Mount');
var Danger = require('./Danger');

var invariant = require('fbjs/lib/invariant');
var tvmlDocument = require('./utils/tvmlDocument');


/**
 * Operations used to process updates to DOM nodes.
 */
var ReactTVMLIDOperations = {
  /**
   * Replaces a DOM node that exists in the document with markup.
   *
   * @param {string} id ID of child to be replaced.
   * @param {string} markup Dangerous markup to inject in place of child.
   * @internal
   * @see {Danger.dangerouslyReplaceNodeWithMarkup}
   */
  replaceNodeWithMarkupByID: function(id, markup) {
    var node = Mount.getNode(id);

    Danger.dangerouslyReplaceNodeWithMarkup(node, markup);
  },

  /**
   * Updates a component's children by processing a series of updates.
   *
   * @param {array<object>} updates List of update configurations.
   * @param {array<string>} markup List of markup strings.
   * @internal
   */
  processChildrenUpdates: function(updates, markup) {
    var markupString = Danger.dangerouslyRenderMarkup(markup);

    try {
        DOMChildrenOperations.processUpdates(updates.map(function(update) {
            update.parentNode = Mount.getNode(update.parentID);
            if(!update.parentNode){
                // probably this is the second update for a document that isnt the current one
                // so we have already unmounted by this point.
                return false;
            }

            if(update.parentNode.ownerDocument.uuid !== tvmlDocument.getActiveDocument().uuid){
                Mount.unmountComponentAtNode(update.parentNode.ownerDocument.documentElement);
                update.parentNode.ownerDocument.invalidated = true;

                return false;
            }

            return update;
        }).filter(function(u){
            return !!u
        }), markupString);

    } catch (e){}
  },

  /**
  * If a particular environment requires that some resources be cleaned up,
  * specify this in the injected Mixin. In the DOM, we would likely want to
  * purge any cached node ID lookups.
  *
  * @private
  */
  unmountIDFromEnvironment: function(rootNodeID) {
    Mount.purgeID(rootNodeID);
  }
};

ReactPerf.measureMethods(ReactTVMLIDOperations, 'ReactTVMLIDOperations', {
  updatePropertyByID: 'updatePropertyByID',
  replaceNodeWithMarkupByID: 'replaceNodeWithMarkupByID',
  processChildrenUpdates: 'processChildrenUpdates'
});

module.exports = ReactTVMLIDOperations;
