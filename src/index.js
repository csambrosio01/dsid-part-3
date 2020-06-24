import React from 'react'
import ReactDOM from 'react-dom'

import Main from "./components/Main";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css'
import './index.css'

ReactDOM.render(<Main/>, document.getElementById('root'))
