##MP Info - Chrome Extension



A simple extension for Chrome, that highlights the names of British Members of Parliament, with data provided by the [They Work For You](http://www.theyworkforyou.com) [API](http://www.theyworkforyou.com/api) displayed in a tool-tip on hover.

----------


###Installation

1. Clone the repo on your computer.
2. Rename `js/src/config.example.js` to `config.js` and insert your They Work For You [API key](http://www.theyworkforyou.com/api/key).
3. Run `npm install`.
4. Run `grunt`.
5. Open the Chrome extensions page, enable developer mode and add the folder.

###Acknowledgements
Thanks to [They Work For You](http://www.theyworkforyou.com) for their API, to [Ollie Glass's TWFY app](https://github.com/ollieglass/theyworkforyou-responsive) for inspiration (and for its [distance_meaning](https://github.com/ollieglass/theyworkforyou-responsive/blob/master/core/api.py) function!), and to [The Public Whip](http://www.publicwhip.org.uk) for providing the list of [policies](http://www.publicwhip.org.uk/policies.php).