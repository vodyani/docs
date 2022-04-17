import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/join.svg').default,
    description: (
      <>
      With a rich set of built-in modules and CLI tools, you can learn how to develop a robust, modern server-side monolithic application in a very short period of time.
      </>
    ),
  },
  {
    title: 'Modular design',
    Svg: require('@site/static/img/module.svg').default,
    description: (
      <>
      Thanks to the design philosophy of dependency injection and dependency inversion, you can easily distinguish logic with different responsibilities into individual modules and give them different capabilities.
      </>
    ),
  },
  {
    title: 'Powerful business processing capabilities',
    Svg: require('@site/static/img/convert.svg').default,
    description: (
      <>
      Parameter verification is troublesome? How to handle data conversion? How to decouple internal and external calls in business logic? These will no longer be a problem in Vodyani.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
