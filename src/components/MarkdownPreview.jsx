import { JSDOM } from 'jsdom';
import PropTypes from 'prop-types';
import React from 'react';
import createDOMPurify from 'dompurify';
import hljs from 'highlight.js';
import marked from 'marked';

// Initializing DOM Purify
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

export default class MarkdownPreview extends React.Component {
  constructor(props) {
    super(props);

    let options = {};
    if (this.props.markedOptions) {
      options = this.props.markedOptions;
    }

    options = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      langPrefix: 'hljs ',
      ...options,
    };

    if (typeof hljs !== 'undefined') {
      options = {
        ...options,
        highlight: (code, lang) => {
          if (!!(lang && hljs.getLanguage(lang))) {
            return hljs.highlight(lang, code).value;
          }

          return code;
        },
      };
    }

    marked.setOptions(options);
  }
  render() {
    const { value, className } = this.props;
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => (
      `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
    );
    const html = DOMPurify.sanitize(marked(value || '', { renderer }));

    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={className}
      />
    );
  }
}

MarkdownPreview.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  markedOptions: PropTypes.object,
};

MarkdownPreview.defaultProps = {
  value: '',
};
