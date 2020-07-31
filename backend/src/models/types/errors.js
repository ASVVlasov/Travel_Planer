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
   userMissingError: createError(400, 'Такого участника нет в путешествии! Возможно его еще не добавили?', {
      type: ErrorType.ERROR,
   }),
   cantLeaveError: createError(400, 'Нельзя покинуть поездку которая уже прошла', { type: ErrorType.ERROR }),
   ownerLeaveError: createError(400, 'Вы не можете покинуть поездку, лишь удалить ее совсем... 😥', {
      type: ErrorType.ERROR,
   }),
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
      'Сообщение для восстановления пароля уже было вам направлено. Возможно оно еще не дошло или уже затерялось среди других писем. Проверьте почту, пожалуйста!',
      { type: ErrorType.WARNING }
   ),
}

const cardError = {
   notFoundError: createError(404, 'Карточка не найдена', { type: ErrorType.ERROR }),
   costError: createError(
      400,
      'Стоимость может состоять только из цифр. А буквы и символы можно оставить в комментарии 📝',
      { type: ErrorType.WARNING }
   ),
}

const authError = {
   emailExistError: createError(
      400,
      'Пользователь с таким адресом уже есть. Зарегистрироваться повторно нельзя, а поменять забытый пароль – можно 🤗',
      { type: ErrorType.WARNING }
   ),
   emailNotFoundError: createError(
      400,
      'Пользователь с таким адресом не найден: проверьте написание (например, ya.ru и yandex.ru это разные адреса для системы). Если всё верно, то нужно зарегистрироваться ✍️',
      { type: ErrorType.WARNING }
   ),
   passwordWrongError: createError(
      400,
      'Введен неверный пароль. Знаем, что сложно запомнить все, поэтому забытый пароль легко поменять 🤗',
      { type: ErrorType.WARNING }
   ),
   regUserError: createError(400, 'Вы должны сначала подтвердить свою почту прежде чем пользоваться приложением', {
      type: ErrorType.ERROR,
   }),
   notFoundError: createError(404, 'Подтверждение по почте недоступно, попробуйте запросить его снова', {
      type: ErrorType.ERROR,
   }),
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

module.exports = {
   travelError,
   cardError,
   authError,
   commonError,
   userError,
   fileError,
}
