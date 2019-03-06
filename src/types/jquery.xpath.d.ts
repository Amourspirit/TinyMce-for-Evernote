// tslint:disable:jsdoc-format
// tslint:disable:max-line-length
// tslint:disable:no-irregular-whitespace

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
/**
 * jQuery plugin for querying XML and HTML documents with XPath 2.0
 * @see \`{@link https://plugins.jquery.com/xpath/ }\`
 */
    xpath(v: string): this;
}