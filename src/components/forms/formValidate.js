import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import { validateInputs } from './validationsInputs'

const style = {
	floatingLabelStyle: { 'color': '#b1adad' },
	labelStyle: { 'color': '#7c7c7c' },
	floatingLabelFocusStyle: { 'color': '#2396f1' },
	underlineFocusStyle: { 'borderColor': '#2396f1' },
	checkbox: { marginTop: '20px' }
}

export const renderField = ({
	input,
	label,
	type,
	meta: { touched, error },
	children,
	extra
}) => {
	if (type === 'text' || type === 'tel' || type === 'password' ) {
		return (<TextField
			{ ...input }
			type={ type }
			name={ label }
			hinttext={ label }
			floatinglabeltext={ label }
			errortext={ touched.toString() && error.toString() }
			floatinglabelstyle={ style.labelStyle }
			underlinefocusstyle={ style.underlineFocusStyle }
			floatinglabelfocusstyle={ style.floatingLabelFocusStyle }
		/>)
	} else if (type === 'checkbox') {
		return (<Checkbox
			name={ label }
			label={ label }
			checked={ input.value ? true : false }
			onCheck={ input.onChange }
			style={ extra.style }
		/>)
	} else if (type === 'textarea') {
		return (
			<TextField
				{ ...input }
				{ ...{ value: input.value.replace(/\r|\n/g, '') } }
				name={ label }
				hinttext={ label }
				floatinglabeltext={ label }
				errortext={ touched.toString() && error.toString() }
				floatinglabelstyle={ style.labelStyle }
				underlinefocusstyle={ style.underlineFocusStyle }
				floatinglabelfocusstyle={ style.floatingLabelFocusStyle }
				{ ...extra }
			/>
		)
	} else {
		return <TextField
			{ ...input }
			type='text'
		/>
	}
}

export const validate = values => {

	const errors = {}

	if (!values.textArea) {
		errors.textArea = 'Поле обязательно для заполнения!'
	} else if (!values.textArea.match(validateInputs.textArea)) {
		errors.textArea = 'Введите корректное описание'
	}

	if (!values.title) {
		errors.title = 'Поле обязательно для заполнения!'
	} else if (!values.title.match(validateInputs.title)) {
		errors.title = 'Введите корректное название'
	}

	if (!values.phoneNumber) {
		errors.phoneNumber = 'Поле обязательно для заполнения!'
	} else if (!values.phoneNumber.match(validateInputs.phoneNumber)) {
		errors.phoneNumber = 'Введите корректный номер телефона'
	}

	if (!values.password) {
		errors.password = 'Поле обязательно для заполнения!'
	} else if (!values.password.match(validateInputs.password)) {
		errors.password = 'Минимум 6 символов'
	}

	if (!values.name) {
		errors.name = 'Поле обязательно для заполнения!'
	} else if (!values.name.match(validateInputs.name)) {
		errors.name = 'Введите корректное имя'
	}

	if (!values.address) {
		errors.address = 'Поле обязательно для заполнения!'
	} else if (!values.address.match(validateInputs.address)) {
		errors.address = 'Введите корректное название'
	}

	if (!values.lastName) {
		errors.lastName = 'Поле обязательно для заполнения!'
	} else if (!values.lastName.match(validateInputs.lastName)) {
		errors.lastName = 'Введите корректную фамилию'
	}

	if (!values.email) {
		errors.email = 'Поле обязательно для заполнения!'
	} else if (!values.email.match(validateInputs.email)) {
		errors.email = 'Введите корректный email'
	}

	if (!values.price) {
		errors.price = 'Поле обязательно для заполнения!'
	} else if (!values.price.match(validateInputs.price)) {
		errors.price = 'Введите корректную сумму'
	}

	return errors
}

renderField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string,
	type: PropTypes.string,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.string
	}),
	children: PropTypes.object,
	extra: PropTypes.object
}