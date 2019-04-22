import React, {Component} from "react"

import Sidebar from '../src/components/sidebar/Sidebar'
import SnackbarExampleSimple from '../src/components/snackbarExampleSimple/SnackbarExampleSimpleComponent.js'

import {actions as articlesActions} from '../ducks/articles'
import {actions as actionsFilterCity} from '../ducks/filterCity'

import '../styles/styles.sass'
import '../styles/base.sass'
import './App.sass'

class Default extends Component {

  static async getInitialProps({ store, isServer, pathname, query }) {
		await store.dispatch(actionsFilterCity.fetchCitysList())
		  
		await store.dispatch(articlesActions.getCards({
			city: '',
			animalType: '',
			postType: ''
		}))
  }

  render() {
		return (
			<div className='wrapApp'>
				<div className='container'>
					<Sidebar />

					<SnackbarExampleSimple />
				</div>
			</div>
		);
  	}
}

export default Default