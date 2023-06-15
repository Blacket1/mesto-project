import { keydownClosePopup, mouseClickClosePopup } from "./modal.js";
import { body } from "./index.js";

// функция блокирвки/разлокировки кнопки "сохранить" для ососбых случаев (открытие модального окна)
export const disableButton = (namePopup, linkPopup, popupElement) => {
  const buttonPopupElement = popupElement.querySelector('.popup__submit')
  if (namePopup.value == '' || linkPopup.value == '') {
    buttonPopupElement.setAttribute('disabled', true);
    buttonPopupElement.classList.add('popup__submit_inactive');
  } else {
    buttonPopupElement.removeAttribute('disabled', true);
    buttonPopupElement.classList.remove('popup__submit_inactive');
  }
}

//функция сброса ошибки 
export const clearError = (popupElement) => {
  const popupInputList = Array.from(popupElement.querySelectorAll('.popup__text'));
  popupInputList.forEach((inputElement) => {
      const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove('popup__text_type-error');
      errorElement.classList.remove('popup__input-error_active');
      errorElement.textContent = '';
  })
}

//функция открытия попапов
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  body.addEventListener('keydown', keydownClosePopup);
  body.addEventListener('click', mouseClickClosePopup);
}

//функция закрытия попапов
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  body.removeEventListener('keydown', keydownClosePopup);
  body.removeEventListener('click', mouseClickClosePopup);
  clearError(popupElement);
}