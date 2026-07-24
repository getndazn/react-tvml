![No longer maintained](https://img.shields.io/badge/Maintenance-OFF-red.svg)

### ⚠️ Deprecated

This repository is no longer actively maintained and has been archived by the [Security team](https://teams.microsoft.com/l/channel/19%3A38b4a7fa05ac4ec782143b767304c53c%40thread.skype/General?groupId=99480e15-059f-4bea-b7cc-4912903bd6f6&tenantId=30459df5-1e53-4d8b-a162-0ad2348546f1).
The repository is retained for historical and reference purposes and is read-only while archived.
If this repository is required in the future, it can be unarchived. Please raise a request with the [CodX team](https://teams.microsoft.com/l/channel/19%3Aa654db0c76f84164aebe0cccf297e6de%40thread.skype/CoDX%20Support?groupId=602f2603-465a-49fa-be9e-abfe0b05b551&tenantId=30459df5-1e53-4d8b-a162-0ad2348546f1) to have it unarchived.

# react-tvml

**this is a very alpha release**

React bindings to Apple's [TVJS and TVML](https://developer.apple.com/library/prerelease/tvos/navigation/)

[![](http://g.recordit.co/qWrCpEb3MQ.gif)](https://cldup.com/u6sOUJLLE9.mp4)
(it's not this slow, click on the gif to see a video)

## install
```bash
$ npm install --save react-tvml
```

## example

[sprice/tvOS-hello-world-example](https://github.com/sprice/tvOS-hello-world-example)

## usage

```js
var React = require('react');
var TVML = require('react-tvml');

var App = React.createClass({
  render: function() {
    return (<loadingTemplate>
      <activityIndicator>
        <text>Loading...</text>
      </activityIndicator>
    </loadingTemplate>);
  }
});

TVML.render(<App />);
```

## todo (PRs are welcome)

 * Most of the code is copied from the react dom renderer. A lot of it needs to be removed and cleaned according to TVML use case
 * push vs replace document
 * some events
 * A **lot** of polish
 * Validations: e.g. some components can only be children of some specific components
 * consistent code style and linting
 * tests

## license

BSD