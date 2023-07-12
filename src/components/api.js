//объект конфигурации
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: 'b7ba3650-e187-4182-a5ff-9dfb206a8c30',
    'Content-Type': 'application/json'
  }
}

// проверка ответа от сервера
function onResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

//функция загрузки информации о пользователе с сервера
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(onResponse)
}

//функция загрузки карточек с сервера
export const getCardData = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(onResponse)
}

//функция редактирования данных профиля на сервере
export const profileEditData = (body) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(body)
  })
    .then(onResponse)
}

//функция добавления новой карточки
export const createCardData = (body) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(body)
  })
    .then(onResponse)
}

//функция удаления карточки
export const deleteCardData = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(onResponse)
}

//функция постановки/снятия лайка на сервере
export const putLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(onResponse)
}

export const deleteLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(onResponse)
}

//обновление аватара пользователя на сервере
export const profileEditAvatar = (body) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(body)
  })
    .then(onResponse)
}