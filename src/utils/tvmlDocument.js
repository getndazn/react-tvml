// There is a bug in tvOS which means that when the player is running getActiveDocument is null
// even if an overlayDocument has been set. If we get a null response then we should expect that
// we should then return the overlay document
var overlayDocument = null;

function setOverlayDocument(doc = null) {
    overlayDocument = doc;
}

function getDocument() {
    return getActiveDocument() || overlayDocument;
}

module.exports = {
    getActiveDocument: getDocument,
    setOverlayDocument: setOverlayDocument
}
