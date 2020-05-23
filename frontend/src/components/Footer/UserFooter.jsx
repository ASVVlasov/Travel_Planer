import React from 'react'
import PropTypes from 'prop-types'
import styles from './UserFooter.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setHistoryFilter } from '../../redux/board/actions'

import Switch from '../../controls/Switch/Switch.jsx'
import { withRouter } from 'react-router-dom'

class UserFooter extends React.Component {
   static propTypes = {
      filter: PropTypes.bool,
      setHistoryFilter: PropTypes.func.isRequired,
   }

   render() {
      return (
         <footer className={styles.footer}>
            {this.props.match.params.tab === 'travels' && (
               <Switch
                  labelText="показать историю"
                  checked={this.props.filter}
                  onChange={(value) => {
                     this.props.setHistoryFilter(value)
                  }}
               />
            )}
         </footer>
      )
   }
}
const mapStateToProps = ({ boardReducer }) => ({
   filter: boardReducer.historyFilter,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ setHistoryFilter }, dispatch)

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(UserFooter)
)
