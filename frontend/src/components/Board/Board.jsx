import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Board.module.scss'
import { NavLink } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BoardSlider from './BoardSlider'
import Button from '../../controls/Button/Button'
import CardFormContainer from '../../containers/CardFormContainer'
import CardShort from '../Cards/CardShort'
import FeedbackForm from '../Forms/FeedbackForm'

import { ReactComponent as PlusIcon } from '../../assets/images/icons/plus.svg'
import { setTabFilter } from '../../redux/board/actions'
import { getBoard } from '../../redux/board/operations'

class Board extends Component {
   static propTypes = {
      getBoard: PropTypes.func.isRequired,
      setTabFilter: PropTypes.func.isRequired,
      tabs: PropTypes.array.isRequired,
      cards: PropTypes.array.isRequired,
   }

   state = {
      isModalOpen: false,
   }

   openModal = () => {
      this.setState({ isModalOpen: true })
   }

   closeModal = () => {
      this.setState({ isModalOpen: false })
   }

   mapTabsToRender = () => {
      return this.props.tabs.map((tab) => (
         <NavLink
            exact
            to={`${tab._id}`}
            className={styles.board__tabsLink}
            activeClassName={styles.board__tabsLink_active}
            children={tab.title}
            key={tab._id}
         />
      ))
   }

   mapCardsToRender = () => {
      return this.props.cards.map((card) => (
         <div key={card._id} className={styles.board__card}>
            <CardShort {...card} />
         </div>
      ))
   }

   componentDidMount() {
      const {
         getBoard,
         match: {
            params: { travelId, board, tab },
         },
      } = this.props

      getBoard(travelId, board.toUpperCase(), tab)
   }

   componentDidUpdate(prevProps) {
      const {
         getBoard,
         setTabFilter,
         match: {
            params: { travelId, board, tab },
         },
      } = this.props

      if (prevProps.match.params.board !== board) {
         getBoard(travelId, board.toUpperCase())
      }
      if (prevProps.match.params.tab !== tab) {
         setTabFilter(tab)
      }
   }

   render() {
      return (
         <div className={styles.board}>
            <div className={styles.board__controlPanel}>
               <nav children={this.mapTabsToRender()} />

               {this.props.cards.length > 2 && (
                  <Button onClick={this.openModal} text="+" type="action" />
               )}
            </div>

            {this.props.match.params.board !== 'todo' && (
               <BoardSlider
                  className={styles.board__cards}
                  slides={[
                     ...this.mapCardsToRender(),
                     <button
                        className={styles.board__card_add}
                        onClick={this.openModal}
                        children={<PlusIcon />}
                     />,
                  ]}
               />
            )}
            {this.props.match.params.board !== 'todo' &&
               this.state.isModalOpen && (
                  <CardFormContainer onClose={this.closeModal} />
               )}

            {this.props.match.params.board === 'todo' && (
               <div className={styles.board__main}>
                  <span className={styles.board__text}>
                     Раздел находится в разработке
                  </span>
                  <br></br>
                  <span className={styles.board__text}>Самое время&nbsp;</span>
                  <span
                     className={styles.board__text_link}
                     onClick={this.openModal}
                  >
                     отправить предложения и пожелания
                  </span>
                  <span className={styles.board__text}>
                     &nbsp;по функционалу
                  </span>
               </div>
            )}
            {this.props.match.params.board === 'todo' &&
               this.state.isModalOpen && (
                  <FeedbackForm onClose={this.closeModal} />
               )}
         </div>
      )
   }
}

const mapStateToProps = ({ boardReducer }) => ({
   tabs: boardReducer.tabs,
   cards: boardReducer.currentCards,
   isLoading: boardReducer.isLoading,
   failureLoading: boardReducer.failureLoading,
   errorMessage: boardReducer.errorMessage,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getBoard, setTabFilter }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Board)
