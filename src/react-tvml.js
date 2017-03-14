try {
  require('imports?this=>global!./globals.js');
} catch (err) {}

var Injection = require('react/lib/ReactInjection');
var EventPluginRegistry = require('react/lib/EventPluginRegistry');
var ComponentEnvironment = require('react/lib/ReactComponentEnvironment');
var ReactIsomorphic = require('react/lib/ReactIsomorphic');
var ReactDOMServer = require('react/lib/ReactDOMServer');
var DOMProperty = require('react/lib/DOMProperty');
var EventPlugin = require('./EventPlugin');
var EventListener = require('./EventListener');
var Component = require('./Component');
var TextComponent = require('./TextComponent');
var ReconcileTransaction = require('./ReconcileTransaction');
var IDOperations = require('./IDOperations');
var Mount = require('./Mount');

var assign = require('react/lib/Object.assign')


EventPluginRegistry._resetEventPlugins();

EventPluginRegistry.registrationNameDependencies = {};

Injection.EventEmitter.injectReactEventListener(EventListener);

/**
 * Inject modules for resolving DOM hierarchy and plugin ordering.
 */
Injection.EventPluginHub.injectEventPluginOrder(['EventPlugin']);
// Injection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
Injection.EventPluginHub.injectMount(Mount);

/**
 * Some important event plugins included by default (without having to require
 * them).
 */
Injection.EventPluginHub.injectEventPluginsByName({
  EventPlugin: EventPlugin
});

Injection.NativeComponent.injectGenericComponentClass(Component);
Injection.NativeComponent.injectTextComponentClass(TextComponent);

// Injection.Class.injectMixin(ReactBrowserComponentMixin);

// ensure react uses setAttribute to update these properties instead of accessing
// them directly using dot notation since tvml doesn't like that
// Perhaps we should update all properties to use setAttribute?
DOMProperty.properties['src'].mustUseAttribute = true;
DOMProperty.properties['className'].mustUseAttribute = true;

// configure react to allow the tvml attributes
var TVMLPropertyList = [
    'accessibilityText',
    'allowsZooming',
    'aspectFill',
    'audioMode',
    'autoHighlight',
    'centered',
    'firstName',
    'handlesOverflow',
    'keyboardType',
    'lastName',
    'mode',
    'playbackMode',
    'rowCount',
    'showSpinner',
    'showsScrollIndicator',
    'secure',
    'theme'
];
var properties = {};
var attributeNames = {}

for(var i = 0, length = TVMLPropertyList.length; i < length; i++){
    properties[TVMLPropertyList[i]] = null;
    attributeNames[TVMLPropertyList[i]] = TVMLPropertyList[i]
}

var TVMLPropertyConfig = {
  isCustomAttribute: function(attributeName) {
    return TVMLPropertyList.indexOf(attributeName) !== -1;
  },
  Properties: properties,
  DOMAttributeNames: attributeNames,
  DOMPropertyNames: {}
};

Injection.DOMProperty.injectDOMPropertyConfig(TVMLPropertyConfig);


//
// Injection.EmptyComponent.injectEmptyComponent('noscript');

Injection.Updates.injectReconcileTransaction(ReconcileTransaction);
// Injection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);

// Injection.RootIndex.injectCreateReactRootIndex(
//   ExecutionEnvironment.canUseDOM ? ClientReactRootIndex.createReactRootIndex : ServerReactRootIndex.createReactRootIndex
// );

ComponentEnvironment.unmountIDFromEnvironment = IDOperations.unmountIDFromEnvironment;
ComponentEnvironment.replaceNodeWithMarkupByID = IDOperations.replaceNodeWithMarkupByID;
ComponentEnvironment.processChildrenUpdates = IDOperations.processChildrenUpdates;

Injection.EventEmitter.injectReactEventListener(EventListener);


module.exports = assign(assign({}, ReactIsomorphic), {
  findDOMNode: require('react/lib/findDOMNode'),
  render: Mount.render,
  unmountComponentAtNode: Mount.unmountComponentAtNode,
  // Server
  renderToString: ReactDOMServer.renderToString,
  renderToStaticMarkup: ReactDOMServer.renderToStaticMarkup
});
