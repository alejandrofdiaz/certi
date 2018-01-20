import * as React from 'react';
import { CatastroSimplifiedElement } from '../model/CatastroSimplifiedElement';
import { selectAndCopyOnClick } from '../common/clickToCopy.component';
import { _CatastroApi } from '../api/catastro.api';
import Sections from '../common/pageSections';

interface Props {
  CatastroElements: Array<CatastroSimplifiedElement>;
  SelectRC: (element: CatastroSimplifiedElement) => any;
}

enum theme {
  root = 'hero is-dark is-bold rcselector__root',
  body = 'hero-body rcselector__body',
  container = 'container rcselector__container',
  containerTitle = 'title rcselector__title',
  containerSubtitle = 'subtitle rcselector__subtitle',
  element = 'media rcselector__element',
  elementContent = 'media-content rcselector__element-content',
  elementDistance = 'tag is-info rcselector__element-distance',
  elementTitle = 'title is-5 rcselector__element-title',
  elementAddress = 'rcselector__element-address',
  elementID = 'tag is-primary rcselector__element-id'
}

function RCSelector(props: Props) {
  function selectRC(element: CatastroSimplifiedElement) {
    return () => {
      _CatastroApi.getDNPRC(element).then(
        ({ data }) => {
          props.SelectRC(data);
        },
        response => {}
      );
    };
  }

  if (props.CatastroElements && props.CatastroElements.length) {
    return (
      <section id={Sections.rc_selector} className={theme.root}>
        <div className={theme.body}>
          <div className={theme.container}>
            <h1 className={theme.containerTitle}>Selección de parcela</h1>
            <h2 className={theme.containerSubtitle}>
              A continuación aparecerán los elementos cercanos al punto seleccionado en el mapa. Se
              encuentran ordenados por la distancia al punto seleccionado.
            </h2>
            {props.CatastroElements.map((item, i) => (
              <article key={i} className={theme.element} onClick={selectRC(item)} role="button">
                <div className={theme.elementContent}>
                  <h5 className={theme.elementTitle}>
                    <span className={theme.elementDistance}>
                      {`${item.dis} metros`}
                      <span className="fa fa-map-marker" />
                    </span>
                    <span className={theme.elementID} onClick={selectAndCopyOnClick}>
                      {item.getFullRC()}
                      <span className="fa fa-tags" />
                    </span>

                    <span className={theme.elementAddress}>{item.ldt}</span>
                  </h5>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
}

export { RCSelector };
