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
    title: '简单易用',
    Svg: require('@site/static/img/join.svg').default,
    description: (
      <>
      通过丰富的内置模块与 CLI 工具，您在非常短的时间内就可以了解如何开发一个健壮的，现代化的服务端单体应用。
      </>
    ),
  },
  {
    title: '模块化设计',
    Svg: require('@site/static/img/module.svg').default,
    description: (
      <>
      得益于依赖注入与依赖反转的设计哲学，您可以轻松的将不同职责的逻辑区分成独立的模块个体，并赋予他们不同的能力。
      </>
    ),
  },
  {
    title: '强大的业务处理能力',
    Svg: require('@site/static/img/convert.svg').default,
    description: (
      <>
      业务开发中的参数校验，数据转换，切面处理，您都可以在 Vodyani 中找到对应的解决方案。
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
