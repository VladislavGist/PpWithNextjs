import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

import { actions as actionsSnackbarReducer } from '../../../ducks/snackbarReducer'

class SnackbarExampleSimple extends React.Component {

	state = { open: false }

	handleTouchTap = () => this.setState({ open: true })

	handleRequestClose = () => {
		this.setState({ open: false })
		this.props.handleSnackbar('')
	}

	componentWillReceiveProps(nextProps) {
		nextProps.snackbarReducer && this.handleTouchTap()
	}

	render() {
		return (
			<Snackbar
				open={ this.state.open }
				message={ this.props.snackbarReducer }
				autoHideDuration={ 4000 }
				onClose={ this.handleRequestClose }
			/>
		)
	}
}

SnackbarExampleSimple.propTypes = {
	snackbarReducer: PropTypes.string.isRequired
}

export default connect(
	state => ({ snackbarReducer: state.snackbarReducer }),
	{ ...actionsSnackbarReducer }
)(SnackbarExampleSimple)