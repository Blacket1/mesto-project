import { settingsOfValidation } from "./index.js";

// функция блокирвки/разлокировки кнопки "сохранить" для ососбых случаев (открытие модального окна)
export const disableButton = (popupElement) => {
  const buttonPopupElement = popupElement.querySelector(settingsOfValidation.submitButtonSelector)
    buttonPopupElement.setAttribute('disabled', true);
    buttonPopupElement.classList.add(settingsOfValidation.inactiveButtonClass);
}

//показывает элемент ошибки
const showInputError = (formElement, inputElement, errorMessage, settingsOfValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsOfValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsOfValidation.errorClass);
}

//скрывает элемент ошибки
export const hideInputError = (formElement, inputElement, settingsOfValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsOfValidation.inputErrorClass);
  errorElement.classList.remove(settingsOfValidation.errorClass);
  errorElement.textContent = '';
}

//функция, обходящая массив полей и проверяющая есть ли хоть одно поле непрошедшее валидацию
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//стилизация и включение/выключение кнопки "сохранить"
const toggleButtonState = (inputList, buttonElement, settingsOfValidation) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settingsOfValidation.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settingsOfValidation.inactiveButtonClass);
  }
}

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, settingsOfValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsOfValidation);
  } else {
    hideInputError(formElement, inputElement, settingsOfValidation);
  }
}

//функция, добавляющая обработчики сразу всем полям формы
const setEventListeners = (formElement, settingsOfValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsOfValidation.inputSelector));
  const buttonElement = formElement.querySelector(settingsOfValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settingsOfValidation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, settingsOfValidation);
      toggleButtonState(inputList, buttonElement, settingsOfValidation);
    });
  });
}

//добавление обработчиков всем формам
export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(settingsOfValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settingsOfValidation);
  });
}
