const createError = require('http-errors')
const ErrorType = require('./enumErrorTypes')

const travelError = {
   notFoundError: createError(404, 'Путешествие не найдено', { type: ErrorType.ERROR }),
   dateError: createError(
      400,
      'Дата начала не может быть больше даты окончания – жаль, но машину времени мы пока не разработали 🤖',
      { type: ErrorType.WARNING }
   ),
}

const userError = {
   duplicateUser: createError(
      400,
      'Такой участник здесь уже есть. Возможно кто-то добавил его до вас... или у нас двоится 👀 Обновите страницу, чтобы проверить.',
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
      401,
      'Пользователь с таким адресом не найден: проверьте написание (например, ya.ru и yandex.ru это разные адреса для системы). Если всё верно, то нужно зарегистрироваться ✍️',
      { type: ErrorType.WARNING }
   ),
   passwordWrongError: createError(
      401,
      'Введен неверный пароль. Знаем, что сложно запомнить все, поэтому забытый пароль легко поменять 🤗',
      { type: ErrorType.WARNING }
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
}
