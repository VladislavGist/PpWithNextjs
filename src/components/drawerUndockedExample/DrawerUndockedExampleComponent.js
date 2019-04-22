import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import RaisedButton from '@material-ui/core/Button'

import { moduleName } from '../../../ducks/auth'

import LoginModal from '../sendDialog/SendDialogComponent.js'

class DrawerUndockedExample extends Component {

	state = { open: false }

	handleToggle = () => this.setState({ open: !this.state.open })
	handleClose = () => this.setState({ open: false })

	handleRequestChange = open => this.setState({ open })

	restUserMenu = () => {
		const { user } = this.props

		if (!user) {
			return (
				<div>
					<MenuItem onTouchTap={ this.handleClose }>
						<LoginModal
							titleBtn='Вход / регистрация'
							dialogModal='01'
						/>
					</MenuItem>

					<MenuItem onTouchTap={ this.handleClose }>
						<LoginModal
							titleBtn='Подать объявление'
							classesBtn='button2'
							dialogModal='01'
						/>
					</MenuItem>
				</div>
			)
		} else {
			return (
				<div className='userBtns'>
					<MenuItem onTouchTap={ this.handleClose }>
						<Link
							href='/personalArea'
							className='button2'>
								Личный кабинет
						</Link>
					</MenuItem>

					{ user.role === 'moderator' ? (
						<MenuItem onTouchTap={ this.handleClose }>
							<Link
								href='/moderation'
								className='button2'>
									Moderation
							</Link>
						</MenuItem>
					) : null }

					<MenuItem onTouchTap={ this.handleClose }>
						<Link
							href='/placeAnAd'
							className='button2'>
								Подать объявление
						</Link>
					</MenuItem>
				</div>
			)
		}
	}

	render() {
		const { filterCity } = this.props

		let style = {
			RaisedBtn: {
				'minWidth': '50px',
				'maxWidth': '50px'
			},
			RaisedBtnButton: {
				'height': '40px'
			}
		}

		return (

			<div className='mobileMenuBtn'>
				<RaisedButton
					label={ <i className='fa fa-bars' /> }
					onTouchTap={ this.handleToggle }
					className='mobileMenuBtn shadowMaterial1'
					backgroundColor='#2196f3'
					labelColor='white'
					style={ style.RaisedBtn }
					buttonStyle={ style.RaisedBtnButton }
				/>

				<Drawer
					docked={ false }
					width={ 250 }
					open={ this.state.open }
					onRequestChange={ this.handleRequestChange }
				>
					<MenuItem onTouchTap={ this.handleClose }>
						<LoginModal
							titleBtn={ filterCity.cityTopHeader }
							dialogModal='02'
						/>
					</MenuItem>

					{ this.restUserMenu() }
				</Drawer>
			</div>
		)
	}
}

DrawerUndockedExample.propTypes = {
	user: PropTypes.object,
	filterCity: PropTypes.object
}

export default connect(state => ({
	user: state[moduleName].user,
	filterCity: state.filterCity
}))(DrawerUndockedExample)