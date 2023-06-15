import { enableValidation } from "./validate.js";

//необходимые переменные
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__name-form');
export const profileAbout = document.querySelector('.profile__about-form');
export const form = document.querySelector('.popup__input-container');
export const popupName = document.querySelector('.popup__text_name');
export const popupAbout = document.querySelector('.popup__text_about');
export const popupNameCard = document.querySelector('.popup__text_namecard');
export const popupAddresCard = document.querySelector('.popup__text_adress-card');
export const popupProfile = document.querySelector('.popup_profile');
export const popupCard = document.querySelector('.popup_add-card');
export const popupPicture = document.querySelector('.popup_picture');
export const cardsContainer = document.querySelector('.elements__cards');
export const popupImage = document.querySelector('.popup__image');
export const popupTextPicture = document.querySelector('.popup__text-picture');
export const popupCloseButtons = document.querySelectorAll('.popup__close-button');
export const body = document.querySelector('.body');


export const settingsOfValidation = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type-error',
  errorClass: 'popup__input-error_active'
};

enableValidation(settingsOfValidation);