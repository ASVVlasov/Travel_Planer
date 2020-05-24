import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './CardFull.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
   changeCard,
   deleteCard,
   uploadFile,
   deleteFile,
   changePayerStatus,
} from '../../redux/cards/operations'
import { getBudget } from '../../redux/travel/operations'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import Switch from '../../controls/Switch/Switch'
import CardFormContainer from '../../containers/CardFormContainer'
import UserPicker from '../../controls/UserPicker/UserPicker'

import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import { ReactComponent as EditIcon } from '../../assets/images/icons/pencil.svg'
import { ReactComponent as AddIcon } from '../../assets/images/icons/plus.svg'

class CardFull extends Component {
   static propTypes = {
      toClose: PropTypes.func.isRequired,
      changeCard: PropTypes.func.isRequired,
      deleteCard: PropTypes.func.isRequired,
      uploadFile: PropTypes.func.isRequired,
      deleteFile: PropTypes.func.isRequired,
      changePayerStatus: PropTypes.func.isRequired,
      getBudget: PropTypes.func.isRequired,
      card: PropTypes.object.isRequired,
   }

   state = {
      comment: '',
      cost: 0,
      isCardFormOpen: false,
      isUserPickerOpen: false,
      userPickerPosition: {},
   }

   //TODO remove
   FILE_URL = window.location.port
      ? 'http://localhost:3300/card/file/'
      : window.location.origin + '/card/file/'

   openForm = (formName) => {
      this.setState({ [`is${formName}Open`]: true })
   }

   closeForm = (formName) => {
      this.setState({ [`is${formName}Open`]: false })
   }

   setPosition = (x, y) => {
      return {
         position: 'absolute',
         top: y + 'px',
         left: x + 'px',
      }
   }

   commentInput = createRef()
   filesInput = createRef()
   costInput = createRef()

   focusInput = (input) => {
      input.focus()
      if (input.name === 'comment') {
         input.setSelectionRange(input.value.length, input.value.length)
      }
   }

   uploadFileHandler = (e) => {
      const { card, uploadFile } = this.props

      const file = new FormData()
      file.append('travelId', card.travelId)
      file.append('cardId', card._id)
      file.append('files', e.target.files[0])

      uploadFile(file)
      e.target.value = null
   }

   deleteFileHandler = (fileId) => {
      const { card, deleteFile } = this.props
      deleteFile({ fileId, cardId: card._id })
   }

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   updateCard = (changedArea, newValue) => {
      const card = { ...this.props.card }

      if (card[changedArea] !== newValue) {
         card[changedArea] = newValue
         this.props.changeCard(card)
      }
   }

   convertDate = (date = null) => {
      if (date) {
         const stringToDate = new Date(Date.parse(date))
         return stringToDate.toLocaleString('ru', {
            timeZone: 'Europe/Moscow',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
         })
      }
   }

   filesToRender = () => {
      return this.props.card.files.map((file) => (
         <span key={file._id} className={styles.docs__file}>
            <a
               download
               href={this.FILE_URL + file._id}
               children={file.fileName}
               className={styles.docs__link}
            />
            <CloseIcon
               className={classNames(styles.icons, styles.icons__delete)}
               onClick={() => this.deleteFileHandler(file._id)}
            />
         </span>
      ))
   }

   payersToRender = () => {
      const { card, changePayerStatus, getBudget } = this.props

      return card.payers.map((payer) => (
         <div className={styles.travelers__person} key={payer._id}>
            <div
               className={styles.travelers__avatar}
               title={payer.user.nickName}
            >
               {!payer.user.avatar && payer.user.nickName[0]}
               {payer.user.avatar && (
                  <img
                     src={this.FILE_URL + payer.user.avatar}
                     alt={payer.user.nickName}
                  />
               )}
            </div>
            <span
               className={styles.travelers__name}
               title={payer.user.nickName}
               children={payer.user.nickName}
            />
            <div
               className={styles.travelers__switch}
               children={
                  <Switch
                     checked={payer.isPayer}
                     onChange={(e) => {
                        changePayerStatus({ ...payer, isPayer: e })
                        getBudget(card.travelId)
                     }}
                  />
               }
            />
            <div
               className={styles.travelers__switch}
               children={
                  <Switch
                     checked={payer.hasPayed}
                     onChange={(e) => {
                        changePayerStatus({ ...payer, hasPayed: e })
                        getBudget(card.travelId)
                     }}
                  />
               }
            />
         </div>
      ))
   }

   setCostFormat = (number) => {
      if (number) {
         return number
            .toString()
            .split(' ')
            .join('')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      }
      return '0'
   }

   splitGeneralCost = () => {
      const { payers, cost } = this.props.card
      const personalCost = this.setCostFormat(parseInt(cost / payers.length))

      return payers.map((payer) => (
         <span
            key={payer._id}
            className={styles.card__cost_personal}
            children={personalCost + ' P'}
         />
      ))
   }

   componentDidMount() {
      this.setState({ cost: this.props.card.cost })
   }
   render() {
      const { toClose, deleteCard, card } = this.props

      const {
         _id,
         type,
         title,
         company,
         beginPoint,
         beginDate,
         endPoint,
         endDate,
         comment,
         payers,
      } = card

      const routeSectionTitle = type === 'Транспорт' ? 'Маршрут' : 'Адрес'

      return (
         <ModalBase toClose={toClose}>
            <div className={styles.card}>
               <div className={styles.card__header}>
                  <span className={styles.card__breadcrumbs}>
                     {type} / <strong>{title}</strong>
                  </span>
                  <CloseIcon
                     className={classNames(styles.icons, styles.icons__close)}
                     onClick={toClose}
                  />
               </div>

               <div className={styles.card__leftSide}>
                  <section className={styles.card__route}>
                     <div className={styles.section__title}>
                        <h2>{routeSectionTitle}</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={() => this.openForm('CardForm')}
                        />
                     </div>

                     <span
                        className={styles.card__companyName}
                        children={company}
                     />

                     <div className={styles.schema}>
                        {beginPoint && <div className={styles.schema__point} />}
                        {endPoint && (
                           <>
                              <div className={styles.schema__path} />
                              <div className={styles.schema__point} />
                           </>
                        )}
                     </div>

                     <div className={styles.route}>
                        <div className={styles.route__start}>
                           <span
                              className={styles.route__place}
                              children={beginPoint}
                           />
                           <span
                              className={styles.route__date}
                              children={this.convertDate(beginDate)}
                           />
                        </div>
                        <div className={styles.route__finish}>
                           <span
                              className={styles.route__place}
                              children={endPoint}
                           />
                           <span
                              className={styles.route__date}
                              children={this.convertDate(endDate)}
                           />
                        </div>
                     </div>
                  </section>

                  <section className={styles.card__docs}>
                     <div className={styles.section__title}>
                        <h2>Документы</h2>
                        <AddIcon
                           className={styles.icons}
                           onClick={() => this.filesInput.current.click()}
                        />
                        <input
                           className={styles.displayNone}
                           type="file"
                           ref={this.filesInput}
                           onChange={(e) => this.uploadFileHandler(e)}
                        />
                     </div>
                     {this.filesToRender()}
                  </section>

                  <section className={styles.card__comments}>
                     <div className={styles.section__title}>
                        <h2>Комментарии</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={() =>
                              this.focusInput(this.commentInput.current)
                           }
                        />
                     </div>
                     <textarea
                        name="comment"
                        value={this.state.comment || comment}
                        ref={this.commentInput}
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) =>
                           this.updateCard(e.target.name, e.target.value)
                        }
                     />
                  </section>
               </div>

               <div className={styles.card__rightSide}>
                  <section className={styles.card__travelers}>
                     <div className={styles.section__title}>
                        <h2>Участники</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={(e) => {
                              this.setState({
                                 userPickerPosition: this.setPosition(
                                    e.clientX - 140,
                                    e.clientY + 20
                                 ),
                              })
                              this.openForm('UserPicker')
                           }}
                        />
                     </div>
                     {payers.length > 0 && (
                        <div className={styles.travelers__columns}>
                           <span
                              className={styles.travelers__columnTitle}
                              children="заплатил за всех"
                           />
                           <span
                              className={styles.travelers__columnTitle}
                              children="заплатил за себя"
                           />
                        </div>
                     )}

                     {this.payersToRender()}
                  </section>

                  <section className={styles.card__cost}>
                     <div className={styles.section__title}>
                        <h2>Стоимость</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={() =>
                              this.focusInput(this.costInput.current)
                           }
                        />
                     </div>
                     <span className={styles.card__cost_general}>
                        <input
                           name="cost"
                           type="text"
                           value={this.setCostFormat(this.state.cost)}
                           ref={this.costInput}
                           onChange={(e) => this.handleChange(e)}
                           onKeyDown={(e) => this.handleChange(e)}
                           onBlur={(e) =>
                              this.updateCard(
                                 e.target.name,
                                 +e.target.value.split(' ').join('')
                              )
                           }
                        />
                        {' Р'}
                     </span>
                     {this.splitGeneralCost()}
                  </section>

                  <div className={styles.card__actions}>
                     <Button
                        onClick={() => {
                           deleteCard(_id)
                           toClose()
                        }}
                        text="Удалить карточку"
                        kind="delete"
                     />
                     <Button onClick={toClose} text="OK" ml={20} />
                  </div>
               </div>
            </div>

            {this.state.isCardFormOpen && (
               <CardFormContainer
                  onClose={() => this.closeForm('CardForm')}
                  card={card}
               />
            )}

            {this.state.isUserPickerOpen && (
               <UserPicker
                  onClose={() => this.closeForm('UserPicker')}
                  position={this.state.userPickerPosition}
                  payers={payers}
                  cardId={card._id}
               />
            )}
         </ModalBase>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      {
         changeCard,
         deleteCard,
         uploadFile,
         deleteFile,
         changePayerStatus,
         getBudget,
      },
      dispatch
   )

export default connect(null, mapDispatchToProps)(CardFull)
