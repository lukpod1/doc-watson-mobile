/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer center" id="footer">
        <section className="sitemap">
          
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('doc1.html', this.props.language)}>
              IBM Cloud + Watson Assistant
            </a>
            <a href={this.docUrl('doc2.html', this.props.language)}>
              Node.js
            </a>
            <a href={this.docUrl('doc3.html', this.props.language)}>
              React Native
            </a>
          </div>
          
          <div>
            <h5>More</h5>
            <a href="https://github.com/lukpod1/doc-watson-mobile">Código Fonte da Documentação</a>
            <a href="https://github.com/lukpod1/server-watson">Código Fonte do Server Node</a>
            <a href="https://github.com/lukpod1/watson-mobile">Código Fonte da Aplicação Mobile</a>
          </div>
        </section>

        <a
          href="https://opensource.facebook.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource">
          <img
            src={`${this.props.config.baseUrl}img/oss_logo.png`}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
