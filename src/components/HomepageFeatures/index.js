import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: 'Ship Documentation',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate>
        Start with docs, blog, search, translations, and responsive pages already wired together.
      </Translate>
    ),
  },
  {
    title: 'Customize The Stack',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate>
        Extend the React pages, adjust the theme tokens, and keep project content in Markdown or MDX.
      </Translate>
    ),
  },
  {
    title: 'Publish Anywhere',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate>
        Build static files for any host or serve the production image with the included Nginx setup.
      </Translate>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
