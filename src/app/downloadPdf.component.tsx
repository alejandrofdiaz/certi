import * as React from 'react';

interface State {

}

const theme = {
	container: ['hero', 'is-warning', 'is-bold'].join(' '),
	body: ['hero-body'].join(' '),
	body_container: ['container'].join(' '),
	title: ['title'].join(' '),
	subtitle: ['subtitle'].join(' '),
	form: [].join(' ')
}

interface Props {
	fileName: string;
}

const DownloadPdfFormContainer: React.StatelessComponent = (props) => (
	<section
		className={theme.container}>
		<div className={theme.body}>
			<div className={theme.body_container}>
				<h1 className={theme.title}>Consigue tu etiqueta energética</h1>
				<h2 className={theme.subtitle}>Vamos a necesitar el XML de tu estudio energético y el código de la gestión que te dio la administración cuando inscribiste el código.</h2>
				<form className={theme.form}>
					{props.children}
				</form>
			</div>
		</div>
	</section>
)


const fileInputTheme = {
	container: ['file', 'has-name'].join(' '),
	label: ['file-label'].join(' '),
	input: ['file-input'].join(' '),
	icon: ['fa', 'fa-upload'].join(' '),
	icon_wrapper: ['file-icon'].join(' '),
	button: ['file-cta'].join(' '),
	name: ['file-name'].join(' '),
}

const FileInput: React.StatelessComponent<Props> = (props) =>
	(<div className={fileInputTheme.container}>
		<label className={fileInputTheme.label}>
			<input className={fileInputTheme.input}
				type='file' />
			<span className={fileInputTheme.button}>
				<span className={fileInputTheme.icon_wrapper}>
					<i className={fileInputTheme.container}></i>
				</span>
				<span className={fileInputTheme.label}>Elige archivo Xml</span>
			</span>
			<span className={fileInputTheme.name}>{props.fileName}</span>
		</label>
	</div>)


export class DownloadPdfForm extends React.Component<{}, {}>{
	constructor() {
		super();
	}

	render() {
		return (
			<DownloadPdfFormContainer>
				<FileInput />
			</DownloadPdfFormContainer>
		)
	}
}