import React from 'react'
import { Route } from 'react-router-dom'

import styles from './HomePage.module.scss'
import Slider from '../../components/Slider/Slider.jsx'
import { ReactComponent as Logo } from '../../assets/images/icons/logo.svg'
import Registration from '../../components/Registartion/Registration.jsx'

import Alert from '../../controls/Alert/Alert'
import connect from 'react-redux/es/connect/connect'

class HomePage extends React.Component {
   render() {
      const { match, registerAlert, loginError } = this.props

      return (
         <>
            <div className={styles.page}>
               <div className={styles.page__slider}>
                  <Logo className={styles.page__logo} />
                  <Slider />
               </div>
               <Route path={match.path} component={Registration} />
            </div>
            {registerAlert && (
               <Alert {...registerAlert} errName="registerAlert" />
            )}
            {loginError && <Alert {...loginError} errName="loginError" />}
         </>
      )
   }
}

const mapStateToProps = ({ fetchReducer }) => ({
   registerAlert: fetchReducer.registerAlert,
   loginError: fetchReducer.loginError,
})

export default connect(mapStateToProps)(HomePage)
