import { popupImage, popupTextPicture, popupPicture} from "./index.js";
import { openPopup } from "./modal.js";
//переменная содержащая массив для добавления карточек с помощью Js 
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//функция лайка картинки
function likeCard(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

//функция удаления карточки
function deleteCard() {
  const deleteButton = document.querySelector('.elements__trash-button');
  const item = deleteButton.closest('.elements__item');
  item.remove();
}

//функция создания карточки
export function createCard(name, link) {
  const templateElement = document.querySelector('.template-card').content;
  const cardItem = templateElement.querySelector('.elements__item').cloneNode(true);
  const elementImage = cardItem.querySelector('.elements__image');
  const elementText = cardItem.querySelector('.elements__text');
  elementImage.src = link;
  elementImage.alt = name;
  elementText.textContent = name;  
 //добавляем работу кнопки "лайков"
  cardItem.querySelector('.elements__like-button').addEventListener('click', likeCard);
//кнопка корзины 
  cardItem.querySelector('.elements__trash-button').addEventListener('click', deleteCard);
//слушатель вызвающий открытие картинки при нажатии на картинку карточки
  elementImage.addEventListener('click', function(){
    openPopup(popupPicture);
    popupImage.src = link;
    popupImage.alt = name;
    popupTextPicture.textContent = name;
  });
  
  return cardItem;
}
