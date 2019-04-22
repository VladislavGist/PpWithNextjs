import Link from 'next/link'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { moduleName } from '../../../ducks/auth'

import LoginModal from '../sendDialog/SendDialogComponent.js'
import DrawerUndockedExample from '../drawerUndockedExample/DrawerUndockedExampleComponent.js'

import './TopHeaderStyles.sass'

class Sidebar extends Component {

	switchMenuDependensiesRoles = () => {
		const { user } = this.props

		if (!user) {
			return (
				<div className='userBtns'>
					<LoginModal
						titleBtn='Вход / регистрация'
						dialogModal='01'
					/>
					<LoginModal
						titleBtn='Подать объявление'
						classesBtn='button2'
						dialogModal='01'
					/>
				</div>
			)
		} else {
			return (
				<div className='userBtns'>
					<Link href='/personalArea' className='personalArea'>Личный кабинет</Link>
					{ user.role === 'moderator' ? (
						<Link href='/moderation'>Модерация</Link>
					) : null }
					
					<Link
						href='/placeAnAd'
						className='button2'>
							Подать объявление
					</Link>
				</div>
			)
		}
	}

	render() {
		const { filterCity } = this.props

		return (
			<header>
				<div className='menuHeader'>
					<div className='top_logo'>
						<Link href='/'>
							<img src='/static/images/app/PPLogo.png'
								width='120'
								alt='logotype'
							/>
						</Link>
						<h1 className='h1'>Продай, купи, отдай в дар, сообщи о находке или пропаже животного</h1>
					</div>

					<MediaQuery minWidth='1024px'>
						<LoginModal titleBtn={ filterCity.cityTopHeader } dialogModal='02' />
					</MediaQuery>

					<MediaQuery minWidth='1024px'>
						{ this.switchMenuDependensiesRoles() }
					</MediaQuery>

					<MediaQuery maxWidth='1023px'>
						<DrawerUndockedExample />
					</MediaQuery>
				</div>
			</header>
		)
	}
}

Sidebar.propTypes = {
	user: PropTypes.object,
	filterCity: PropTypes.object.isRequired
}

export default connect(state => ({
	user: state[moduleName].user,
	filterCity: state.filterCity,
}))(Sidebar)