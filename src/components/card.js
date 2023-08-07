import { popupImage, popupTextPicture, popupPicture, profile } from "./index.js";
import { openPopup } from "./modal.js";
import { deleteCardData, putLike, deleteLike } from "./api.js";


//функция лайка картинки
const likeCard = (evt) => {
  const item = evt.target.closest('.elements__item');
  const itemId = item.getAttribute('data-id');
  const likeNumbers = item.querySelector('.elements__like-numbers');
  if (evt.target.classList.contains('elements__like-button_active')) {
    deleteLike(itemId)
      .then((data) => {
        evt.target.classList.remove('elements__like-button_active');
        showLikeCounter(likeNumbers, data);
      })
      .catch((err) => {
        console.error(err);
      })
  } else {
    putLike(itemId)
      .then((data) => {
        evt.target.classList.add('elements__like-button_active');
        showLikeCounter(likeNumbers, data);
      })
      .catch((err) => {
        console.error(err);
      })
  }
}

//функция удаления карточки
const deleteCard = (evt) => {
  const item = evt.target.closest('.elements__item');
  const itemId = item.getAttribute('data-id');
  deleteCardData(itemId)
   .then(() => {
    item.remove(); 
   })
   .catch((err) => {
    console.error(err);
   }) 
}

//функция создания карточки
export function createCard(dataCard) {
  const templateElement = document.querySelector('.template-card').content;
  const cardItem = templateElement.querySelector('.elements__item').cloneNode(true);
  const elementImage = cardItem.querySelector('.elements__image');
  const elementText = cardItem.querySelector('.elements__text');
  const deleteButton = cardItem.querySelector('.elements__trash-button');
  const likeButton = cardItem.querySelector('.elements__like-button');
  const likeNumbers = cardItem.querySelector('.elements__like-numbers');
  cardItem.dataset.id = dataCard._id;

  elementImage.src = dataCard.link;
  elementImage.alt = dataCard.name;
  elementText.textContent = dataCard.name;

  showMyBtn(deleteButton, dataCard);
  showMylike(likeButton, dataCard);
  showLikeCounter(likeNumbers, dataCard);
  
 //добавляем работу кнопки "лайков"
  likeButton.addEventListener('click', likeCard);
//кнопка корзины 
  deleteButton.addEventListener('click', deleteCard);
//слушатель вызвающий открытие при нажатии на картинку карточки
  elementImage.addEventListener('click', function(){
    popupImage.src = dataCard.link;
    popupImage.alt = dataCard.name;
    popupTextPicture.textContent = dataCard.name;
    openPopup(popupPicture);
  });
  return cardItem;
}

//проверка на моей ли карточке иконка удаления
const showMyBtn = (deleteButton, dataCard) => {
  if (dataCard.owner._id !== profile.dataset.id) {
    deleteButton.classList.add('elements__trash-button_inactive');
  }
}

//функция которая находит и отображает только мои лайки
const showMylike = (likeButton, dataCard) => {
  if (dataCard.likes.some(item => item._id === profile.dataset.id)) {
    likeButton.classList.add('elements__like-button_active');
  }
} 

//функция отображающая количество лайков
const showLikeCounter = (likeNumbers, dataCard) => {
  if (dataCard.likes.length > 0) {
    likeNumbers.textContent = dataCard.likes.length;
  } else {
    likeNumbers.textContent = '';
  }
}