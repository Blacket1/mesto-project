import { settingsOfValidation } from "./index.js";
import { hideInputError } from "./validate.js";

//функция сброса ошибки в особых случаях
export const clearError = (popupElement) => {
  const popupInputList = Array.from(popupElement.querySelectorAll('.popup__text'));
  popupInputList.forEach((inputElement) => {
    hideInputError(popupElement, inputElement, settingsOfValidation);
  })
}