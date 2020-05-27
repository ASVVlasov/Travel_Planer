import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Registration.module.scss'
import { NavLink } from 'react-router-dom'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
//import { signin, signup } from '../../redux/auth/operations'
import InputControl from '../../controls/Input/InputControl'
import Button from '../../controls/Button/Button'
import Switch from '../../controls/Switch/Switch'

export default class Registration extends Component {
   static propTypes = {
      signin: PropTypes.func,
      signup: PropTypes.func,
   }

   state = {
      email: '',
      password: '',
      rememberMe: false,
      tabs: [
         {
            _id: 'signin',
            title: 'Вход',
            emailPlaceholder: 'Email',
            emailLabel: '',
            emailHintLabel: '',
            passwordPlaceholder: 'Пароль',
            passwordLabel: '',
            passwordHintLabel: '',
            inputStyle: 'input',
            btnText: 'Войти',
         },
         {
            _id: 'signup',
            title: 'Регистрация',
            emailPlaceholder: '',
            emailLabel: 'Введите почту',
            emailHintLabel: 'она же будет логином',
            passwordPlaceholder: '',
            passwordLabel: 'Придумайте пароль',
            passwordHintLabel: 'не менее 6 символов',
            inputStyle: 'input_wide',
            btnText: 'Зарегистрироваться',
         },
      ],
   }
   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
      console.log(this.state)
   }

   submit = () => {
      //this.props.onSubmit(this.state)
   }

   mapTabsToRender = () =>
      this.state.tabs.map((tab) => (
         <NavLink
            to={`${tab._id}`}
            className={styles['tabs-link']}
            activeClassName={styles['tabs-link_active']}
            children={tab.title}
            key={tab._id}
         />
      ))

   render() {
      const { email, password } = this.state
      const tab = this.state.tabs.find(
         (tab) => tab._id === this.props.match.params.tab
      )
      return (
         <div className={styles['form']}>
            <nav
               className={
                  this.props.match.params.tab === 'signin'
                     ? styles['tabs']
                     : styles['tabs_short']
               }
               children={this.mapTabsToRender()}
            />
            <InputControl
               type="text"
               name="email"
               styles={styles[tab.inputStyle]}
               placeholder={tab.emailPlaceholder}
               label={tab.emailLabel}
               hintLabel={tab.emailHintLabel}
               value={email}
               onChange={this.handleChange}
            />
            <InputControl
               type="text"
               name="password"
               styles={styles[tab.inputStyle]}
               placeholder={tab.passwordPlaceholder}
               label={tab.passwordLabel}
               hintLabel={tab.passwordHintLabel}
               value={password}
               onChange={this.handleChange}
            />
            {this.props.match.params.tab === 'signin' && (
               <Switch
                  labelText="Запомнить меня"
                  checked={this.props.rememberMe}
                  className={styles['switch']}
                  onChange={(value) => {
                     this.setState({ ['rememberMe']: value })
                  }}
               />
            )}
            <Button onClick={this.submit} text={tab.btnText} ml={0} />
         </div>
      )
   }
}

// const mapDispatchToProps = (dispatch) =>
//    bindActionCreators({ signin, signup }, dispatch)

// export default connect(mapDispatchToProps)(Registration)
