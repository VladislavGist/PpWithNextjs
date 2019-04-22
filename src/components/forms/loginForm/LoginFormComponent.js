import _ from 'lodash'
import classNames from 'classnames'
import withRedux from "next-redux-wrapper"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Field, reduxForm } from 'redux-form'

import { actions as authActions } from '../../../../ducks/auth'

import { renderField, validate } from '../formValidate'
import { validateInputs } from '../validationsInputs'

class LoginFormComponent extends Component {

	state = { disabledButton: true }

	componentWillUpdate(nextProps) {
		if (nextProps !== this.props) {
			this.disabledSubmitButton(nextProps)
		}
	}

	disabledSubmitButton = nextProps => {

		const { loginForm } = nextProps

		const values = _.get(loginForm, 'values')

		if (values &&
			values.password &&
			values.email &&
			values.password.match(validateInputs.password) &&
			values.email.match(validateInputs.email)) {
			this.setState({ disabledButton: false })
		} else {
			this.setState({ disabledButton: true })
		}
	}

	handleLogin = event => {
		event.preventDefault()
		const { loginForm, loginAction } = this.props

		loginAction({ email: _.get(loginForm, 'values.email'), password: values.password })
	}

	render() {
		const { auth: { userLoading, userError } } = this.props

		return (
			<Form onSubmit={ this.handleLogin } className='sendForm'>
				<div className='wrapInputs'>
					<Field
						name='email'
						type='text'
						label='Email'
						component={ renderField }
					/>
					<Field
						name='password'
						type='password'
						label='Пароль'
						component={ renderField }
					/>
				</div>
				<div>
					<input
						type='submit'
						value={ userLoading && !userError ? 'Загрузка' : 'Войти' }
						className={ classNames({
							'button2': true,
							'disabledButton': this.state.disabledButton || (userLoading && !userError)
						}) }
						disabled={ this.state.disabledButton || (userLoading && !userError) }
					/>
				</div>
			</Form>
		)
	}
}

LoginFormComponent.defaultProps = {
	auth: {
		userLoading: null,
		userError: null
	}
}

LoginFormComponent.propTypes = {
	loginForm: PropTypes.object,
	auth: PropTypes.object
}

LoginFormComponent = reduxForm({
	form: 'loginForm',
	validate
})(LoginFormComponent)

export default withRedux(state => ({
	loginForm: state.form.loginForm,
	auth: state.auth
}), { ...authActions })(LoginFormComponent)