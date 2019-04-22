import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import FlatButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { actions as actionsFilterCity } from '../../../ducks/filterCity'

import TabsForms from '../forms/tabsForms/TabsFormsComponent'

if (process.env.BROWSER) {
	require('./SendDialogStyles.sass')
}

class LoginModal extends Component {

	state = { open: false }

	handleOpen = () => { this.setState({ open: true }) }
	handleClose = () => { this.setState({ open: false }) }

	render() {
		const styles = {
			flatIcon: {
				minWidth: '30px',
				right: '10px',
				top: '-9px'
			}
		}

		const { dispatchCityTopHeader, cityList } = this.props

		const actions = [
			<FlatButton
				icon={ <i className='fa fa-times' aria-hidden='true' /> }
				primary={ true }
				onClick={ this.handleClose }
				style={ styles.flatIcon }
			/>
		]

		const dialogModal01 = () => <Dialog
			actions={ actions }
			modal='false'
			autoscrollbodycontent='true'
			repositiononupdate='true'
			autodetectwindowheight='true'
			open={ this.state.open }
			fullWidth={true}
			onClose={ this.handleClose }
		>
			<TabsForms handleClose={ this.handleClose } />
		</Dialog>

		const dialogModal02 = () => {

			let handleCityTopHeader = e => {
				dispatchCityTopHeader(e.target.innerText)
				this.handleClose()
			}

			return (
				<Dialog
					actions={ actions }
					modal='false'
					autoscrollbodycontent='true'
					repositiononupdate='true'
					autodetectwindowheight='true'
					fullWidth={true}
					open={ this.state.open }
					onClose={ this.handleClose }
				>
					<div className='modalCityWrap'>
						<a href='javascript:void(0)' onClick={ handleCityTopHeader } className='allCitys'>Все регионы</a>
						<div className='modalAllCity'>
							{ cityList && cityList.length > 0
								? cityList.map(elem =>
									<div style={ { display: 'flex' } } key={ Math.random() }>
										<a
											href='javascript:void(0)'
											onClick={ handleCityTopHeader }>
											{ elem.city }
										</a>
										<p>{ elem.count }</p>
									</div>
								)
								: <CircularProgress size={ 60 }/> }
						</div>
					</div>
				</Dialog>
			)
		}

		return (
			<div className='regionsBtn'>
				<a
					href='javascript:void(0)'
					onClick={ this.handleOpen }
					className={ `button1 ${ this.props.classesBtn }` }>
					{ this.props.titleBtn }
				</a>
				{ this.props.dialogModal === '01' ? dialogModal01() : '' }
				{ this.props.dialogModal === '02' ? dialogModal02() : '' }
			</div>
		)
	}
}

LoginModal.propTypes = {
	dispatchCityTopHeader: PropTypes.func.isRequired,
	cityList: PropTypes.array.isRequired
}

export default connect(
	state => ({ cityList: state.filterCity.cityList }),
	{ ...actionsFilterCity }
)(LoginModal)