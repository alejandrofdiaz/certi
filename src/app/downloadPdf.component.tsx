import * as React from 'react';
import { FileXMLCheck } from '../api/utils';
import { Event } from '_debugger';
import { ChangeEvent } from 'react';

const theme = {
	id: 'get_pdf',
	container: ['hero', 'is-warning', 'is-bold'].join(' '),
	body: ['hero-body'].join(' '),
	body_container: ['container'].join(' '),
	title: ['title'].join(' '),
	subtitle: ['subtitle'].join(' '),
	form: [].join(' ')
}

const errorTexts = {
	invalidFile: 'Este archivo no está soportado',
	validFile: 'Este es un archivo válido'
}

const DownloadPdfFormContainer: React.StatelessComponent<any> = (props) => (
	<section
		className={theme.container}
		id={theme.id}>
		<div className={theme.body}>
			<div className={theme.body_container}>
				<h1 className={theme.title}>Consigue tu etiqueta energética</h1>
				<h2 className={theme.subtitle}>
					Vamos a necesitar el XML de tu estudio energético y el código de la gestión que te dio la administración cuando inscribiste el código.
				</h2>
				<form className={theme.form}
					onSubmit={props.onSubmit}>
					{props.children}
				</form>
			</div>
		</div>
	</section>
)


const fileInputTheme = {
	container: ['file', 'has-name', 'is-fullwidth', 'is-danger'].join(' '),
	label: ['file-label'].join(' '),
	input: ['file-input'].join(' '),
	icon: ['fa', 'fa-upload'].join(' '),
	icon_wrapper: ['file-icon'].join(' '),
	button: ['file-cta'].join(' '),
	name: ['file-name'].join(' '),
	dangerError: ['help', 'is-danger'].join(' ')
}

interface FileInputProps {
	fileName: string;
	onChange: (file: FileList) => void;
}

const FileInput: React.StatelessComponent<FileInputProps> = (props) => {
	const onChange = (event) => props.onChange(event.target.files);

	return (
		<div className={fileInputTheme.container}>
			<label className={fileInputTheme.label}>
				<input className={fileInputTheme.input}
					onChange={onChange}
					type='file' />
				<span className={fileInputTheme.button}>
					<span className={fileInputTheme.icon_wrapper}>
						<i className={fileInputTheme.icon}></i>
					</span>
					<span className={fileInputTheme.label}>Elige archivo Xml</span>
				</span>
				<span className={fileInputTheme.name}>
					{props.fileName || 'Ningún archivo seleccionado'}
				</span>
			</label>
		</div>
	)
}

const ErrorText: React.StatelessComponent<{ formError: string }> = ({ formError }) =>
	<p className={fileInputTheme.dangerError}>{formError || ''}</p>


const inputReferenciaTheme = {
	container: 'field',
	label: 'label',
	labelContentText: 'Número de referencia',
	inputContainer: 'control',
	input: 'input',
	inputPlaceholder: '',
	help: 'help',
	helpContentText: 'Este número lo proporciona la administración al dar de alta un CEE.'
}

interface InputReferenciaProps {
	onChange: (event: ChangeEvent<any>) => void
}

const InputReferencia: React.StatelessComponent<InputReferenciaProps> = (props) => {
	return (
		<div className={inputReferenciaTheme.container}>
			<label className={inputReferenciaTheme.label}>
				{inputReferenciaTheme.labelContentText}
			</label>
			<div className={inputReferenciaTheme.inputContainer}>
				<input className={inputReferenciaTheme.input}
					type='text'
					placeholder={inputReferenciaTheme.inputPlaceholder}
					onChange={props.onChange} />
			</div>
			<p className={inputReferenciaTheme.help}>
				{inputReferenciaTheme.helpContentText}
			</p>
		</div>
	)
}



const InputButton: React.StatelessComponent<any> = (props) => {
	return (
		<div className='field'>
			<p className='control'>
				<input
					type='submit'
					disabled={props.disabled}
					className='button is-success is-inverted is-outlined is-large'
					// onChange={props.onSubmit}
					value='Enviar' />
			</p>
		</div>
	)
}

interface State {
	fileName: string;
	file: FileList;
	formError: string;
	numReferencia: string;
}

export class DownloadPdfForm extends React.Component<{}, State>{
	_disabledForm: boolean = true;
	constructor() {
		super();
		this.state = {
			fileName: '',
			file: null,
			formError: '',
			numReferencia: ''
		}

	}

	onFileChange(files: FileList) {
		if (files.length) {
			if (FileXMLCheck(files)) {
				const _fileName = files[0].name || '';
				this.setState({ file: files, fileName: _fileName, formError: errorTexts.validFile });
			} else {
				this.setState({
					file: null, fileName: '',
					formError: errorTexts.invalidFile
				})
			}
		}
	}

	onNumReferenciaChange(event) {
		this.setState({ numReferencia: event.target.value })
	}

	onSubmit(event: ChangeEvent<any>) {
		event.preventDefault();
		if (!this._disabledForm) console.log(this.state)
	}

	render() {
		if (this.state.file && !!this.state.numReferencia) {
			this._disabledForm = false;
		} else { this._disabledForm = true }
		return (
			<DownloadPdfFormContainer
				onSubmit={this.onSubmit.bind(this)}>
				<FileInput
					fileName={this.state.fileName}
					onChange={this.onFileChange.bind(this)} />
				<ErrorText formError={this.state.formError} />
				<InputReferencia onChange={this.onNumReferenciaChange.bind(this)} />
				<InputButton
					disabled={this._disabledForm}
					onSubmit={this.onSubmit.bind(this)} />
			</DownloadPdfFormContainer>
		)
	}
}