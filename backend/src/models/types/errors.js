const createError = require('http-errors')
const ErrorType = require('./enumErrorTypes')

const travelError = {
   notFoundError: createError(404, 'Путешествие не найдено', { type: ErrorType.ERROR }),
   dateError: createError(
      400,
      'Дата начала не может быть больше даты окончания – жаль, но машину времени мы пока не разработали 🤖',
      { type: ErrorType.WARNING }
   ),
   dateCompareError: createError(
      400,
      'Даты путешествия изменены успешно, рекомендуем проверить даты в карточках, чтобы точно ничего не перепутать 😥',
      { type: ErrorType.WARNING }
   ),
   cantLeaveError: createError(400, 'Нельзя покинуть архивную поездку', { type: ErrorType.ERROR }),
}

const userError = {
   duplicateUser: createError(
      400,
      'Такой участник здесь уже есть. Возможно кто-то добавил его до вас... или у нас двоится 👀 Обновите страницу, чтобы проверить.',
      { type: ErrorType.WARNING }
   ),
   notFoundError: createError(400, 'Пользователь не найден', { type: ErrorType.ERROR }),
   restoreSentError: createError(
      400,
      'Ссылка на восстановления пароля отправлена на указанную почту, проверьте «входящие». И «спам», если письмо долго не приходит 🤔',
      { type: ErrorType.WARNING }
   ),
}

const cardError = {
   notFoundError: createError(404, 'Карточка не найдена', { type: ErrorType.ERROR }),
   costError: createError(
      400,
      'Стоимость может состоять только из цифр. Все остальное можно оставить в комментарии 📝',
      { type: ErrorType.WARNING }
   ),
}

const authError = {
   emailExistError: createError(
      400,
      'Пользователь с таким адресом уже есть. Зарегистрироваться повторно нельзя, но можно поменять пароль 😏',
      { type: ErrorType.WARNING }
   ),
   emailNotFoundError: createError(
      400,
      'Пользователь с таким адресом не найден: проверьте написание (например, ya.ru и yandex.ru это разные адреса для системы). Если всё верно, то нужно зарегистрироваться ✍️',
      { type: ErrorType.WARNING }
   ),
   passwordWrongError: createError(400, 'Введен неверный пароль. Если что, его можно поменять 😉', {
      type: ErrorType.WARNING,
   }),
   regUserError: createError(
      400,
      'Регистрация еще не завершена - перейдите по ссылке из письма для подтверждения этой почты  👮‍♀️',
      {
         type: ErrorType.WARNING,
      }
   ),
   regEmailSentError: createError(
      400,
      'Возможно такой почты не существует или почтовый сервер временно недоступен. Проверьте введенный e-mail адрес и попробуйте снова',
      {
         type: ErrorType.ERROR,
      }
   ),
   notFoundError: createError(
      400,
      'Не получилось подтвердить почту, но можно отправить еще одно письмо с новой ссылкой',
      {
         type: ErrorType.ERROR,
      }
   ),
   wrongTokenError: createError(403, 'Неправильный токен', { type: ErrorType.ERROR }),
   tokenNotFoundError: createError(403, 'Токен не найден', { type: ErrorType.ERROR }),
   isTempPasswordError: createError(403, 'Невозможно получить доступ по временному паролю', { type: ErrorType.ERROR }),
}

const fileError = {
   addFileError: createError(
      500,
      'Не удалось загрузить файл по неведомым нам причинам👀. Попробуйте сделать это позже',
      { type: ErrorType.ERROR }
   ),
   getFileError: createError(
      500,
      'Не удалось получить файл по неведомым нам причинам👀. Попробуйте сделать это позже',
      { type: ErrorType.ERROR }
   ),
   deleteFileError: createError(
      500,
      'Не удалось удалить файл по неведомым нам причинам👀. Попробуйте сделать это позже',
      { type: ErrorType.ERROR }
   ),
}

const commonError = createError(
   500,
   'Похоже, возникли проблемы со связью.\n' +
      'Чтобы не потерять внесенные изменения, рекомендуем повторить отправку данных.',
   { type: ErrorType.ERROR }
)

const success = {
   signupSuccess: {
      message: 'Для завершения регистрации пройдите по ссылке из письма, которое мы отправили вам на почту 📫️',
      type: ErrorType.SUCCESS,
   },
   confirmSuccess: {
      message: 'Регистрация завершена, теперь можно переходить к планированию поездок 🎒',
      type: ErrorType.SUCCESS,
   },
   feedbackSuccess: {
      message: 'Мы получили ваше сообщение — спасибо за обратную связь, она помогает нам развиваться ‍🎓‍',
      type: ErrorType.SUCCESS,
   },
   forgotSuccess: {
      message: 'Для успешной смены пароля пройдите по ссылке из письма, которое мы отправили вам на почту 📫️',
      type: ErrorType.SUCCESS,
   },
   inviteSuccess: {
      message: 'Друг получит приглашение на указанную почту, а пока мы добавили его в ваши контакты 😌',
      type: ErrorType.SUCCESS,
   },
}

module.exports = {
   travelError,
   cardError,
   authError,
   commonError,
   userError,
   fileError,
   success,
}
