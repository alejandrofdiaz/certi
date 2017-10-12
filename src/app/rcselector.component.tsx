import * as React from 'react';
import { CatastroSimplifiedElement } from '../model/CatastroSimplifiedElement';
import Sections from '../common/pageSections';


interface Props {
	CatastroElements: Array<CatastroSimplifiedElement>
	SelectRC: (element: CatastroSimplifiedElement) => any
}

const theme = {
	root: 'hero is-dark is-bold rcselector__root',
	body: 'hero-body rcselector__body',
	container: 'container rcselector__container',
	containerTitle: 'title rcselector__title',
	containerSubtitle: 'subtitle rcselector__subtitle',
	element: 'media rcselector__element',
	elementContent: 'media-content rcselector__element-content',
	elementDistance: 'tag is-info rcselector__element-distance',
	elementTitle: 'title is-5 rcselector__element-title',
	elementAddress: 'rcselector__element-address'
}

export const RCSelector = (props: Props) => {

	const selectRC = (element: CatastroSimplifiedElement) => () => {
		props.SelectRC(element)
	}

	if (props.CatastroElements && props.CatastroElements.length) {
		return (
			<section
				id={Sections.rc_selector}
				className={theme.root}>
				<div className={theme.body}>
					<div className={theme.container}>
						<h1 className={theme.containerTitle}>
							Selección de parcela
						</h1>
						<h2 className={theme.containerSubtitle}>
							A continuación aparecerán los elementos cercanos al punto
							seleccionado en el mapa. Se encuentran ordenados por la
							distancia al punto seleccionado.
							</h2>
						{props.CatastroElements.map((item, i) => (
							<article key={i}
								className={theme.element}
								onClick={selectRC(item)}
								role='button'>
								<div className={theme.elementContent}>
									<h5 className={theme.elementTitle}>
										<span className={theme.elementDistance}>
											{`${item.dis} metros`}
											<span className='fa fa-map-marker'></span>
										</span>
										<span className={theme.elementAddress}>
											{item.ldt}</span>
									</h5>
								</div>
							</article>)
						)}
					</div>
				</div>
			</section>
		)
	} else {
		return null
	}
}