import React from "react"
import {Provider} from "react-redux"
import App, {Container} from "next/app"
import withRedux from "next-redux-wrapper"
import Head from 'next/head'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../src/getPageContext'

import makeStore from '../store'

class MyApp extends App {

    constructor() {
        super()
        this.pageContext = getPageContext()
    }

    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side')

        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

        return {pageProps}

    }

    render() {
        const {Component, pageProps, store} = this.props

        return (
            <Container>
                <Provider store={store}>
                    <Head>
                        <title>Pay-Pets</title>
                    </Head>

                    <JssProvider
                        registry={this.pageContext.sheetsRegistry}
                        generateClassName={this.pageContext.generateClassName}
                    >
                        <MuiThemeProvider
                            theme={this.pageContext.theme}
                            sheetsManager={this.pageContext.sheetsManager}
                        >
                            {/* <CssBaseline /> */}
                            <Component {...pageProps} />
                        </MuiThemeProvider>
                    </JssProvider>
                </Provider>
            </Container>
        );
    }

}

export default withRedux(makeStore)(MyApp);