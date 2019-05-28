/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/undraw_messages1_9ah2.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('doc1.html')}>IBM Cloud</Button>
            <Button href={docUrl('doc2.html')}>Node.js</Button>
            <Button href={docUrl('doc3.html')}>React Native</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        {/* <h1>Ferramentas</h1> */}
        <Block layout="fourColumn">
        {[
          {
            content: 'O Watson Assistant é uma ferramenta da IBM para criar interfaces de conversação em qualquer aplicativo, dispositivo ou canal. ',
            image: `${baseUrl}img/undraw_chat_1wo5.svg`,
            imageAlign: 'top',
            title: 'Watson Assistant',
          },
          {
            content: 'Node.js é um interpretador, com código aberto, de código JavaScript de modo assíncrono e orientado a eventos, focado em migrar a programação do Javascript do lado do cliente para os servidores.',
            image: `${baseUrl}img/Node.jpg`,
            imageAlign: 'top',
            title: 'Node.js',
          },
          {
            content: 'O React Native permite que você crie aplicativos móveis usando apenas JavaScript. Ele usa o mesmo design que o React, permitindo compor uma rica interface de usuário móvel usando componentes declarativos.',
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top',
            title: 'React Native',
          },
        ]}
      </Block>
      </div>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'Esse projeto foi desenvolvido para automatizar a tarefa de resumir um pedido de pizza, com praticidade e sem burocracia.',
            image: `${baseUrl}img/undraw_pizza_sharing_wxop.svg`,
            imageAlign: 'right',
            title: 'Descrição',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        
          <FeatureCallout />
          <Description />
        
      </div>
    );
  }
}

module.exports = Index;
