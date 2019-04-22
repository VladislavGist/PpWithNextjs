import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import LoginFormComponent from '../loginForm/LoginFormComponent'
import RegistrationFormComponent from '../registrationForm/RegistrationFormComponent'

if (process.env.BROWSER) {
	require('./tabsFormsStyles.sass')
}

export default class TabsForms extends Component {

	state = {
		value: '0',
		slideIndex: 0
	}

	handleActive = e => this.setState({ slideIndex: e.props.value })

	handleChange = (event, value) => this.setState({ value: value })

	render() {
		const { handleClose } = this.props
		const { value } = this.state

		// const styles = {
		// 	inkBarStyle: { backgroundColor: false },
		// 	default_tab: {
		// 		backgroundColor: 'white',
		// 		color: '#add1ed',
		// 		height: 'auto'
		// 	},
		// 	active_tab: {
		// 		backgroundColor: '#2397f3',
		// 		color: 'white'
		// 	},
		// 	tabItemContainerStyle: {
		// 		minHeight: '100px'
		// 	}
		// }

		// styles.tab = []
		// styles.tab[0] = styles.default_tab
		// styles.tab[1] = styles.default_tab
		// styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[this.state.slideIndex], styles.active_tab)

		return <Tabs
			value={ this.state.value }
			onChange={ this.handleChange }
			// className='sendAndRegTabs'
			// inkBarStyle={ styles.inkBarStyle }
			// contentContainerStyle={ styles.tabTemplateStyle }
		>
			<Tab
				label='Войти'
				value='0'
				className='tabBtn'
				// style={ styles.tab[0] }
				// onActive={ this.handleActive }
			/>
				{/* <div>
					<LoginFormComponent />
					<Link
						to='/resetPassword'
						className='stylesResetPassBtn'
						onClick={ () => handleClose() }
					>
						Восстановить пароль
					</Link>
				</div> */}
			{/* </Tab> */}

			<Tab
				label='Регистрация'
				value='1'
				// className='tabBtn'
				// style={ styles.tab[1] }
				// onActive={ this.handleActive }
			/>
				{/* <div>
					<RegistrationFormComponent handleClose={ handleClose } />
				</div> */}
			{/* </Tab> */}

			{ value === '0' ? (
				<div
					className='stylesResetPassBtn'
					onClick={ () => handleClose() }
				>
					<LoginFormComponent />
					<Link href='/resetPassword'>
						<a>Восстановить пароль</a>
					</Link>
				</div>
			) : null }

			{ value === '1' ? (
				<div>
					<div>
						<RegistrationFormComponent handleClose={ handleClose } />
					</div>
				</div>
			) : null }
		</Tabs>
	}
}

TabsForms.propTypes = {
	handleClose: PropTypes.func.isRequired
}