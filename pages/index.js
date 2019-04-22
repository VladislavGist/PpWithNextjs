import React, {Component} from "react";
import {connect} from "react-redux";

import {actions} from '../ducks/articles'

class Default extends Component {

  static async getInitialProps({ store, isServer, pathname, query }) {
		await store.dispatch(actions.getCards({
			city: '',
			animalType: '',
			postType: ''
		}))
  }

  render() {
		return (
			<p>content...</p>
		);
  	}
}

export default connect()(Default);