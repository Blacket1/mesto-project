//необходимые переменные
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name-form');
const profileAbout = document.querySelector('.profile__about-form');
const popupInputContainer = document.querySelector('.popup__input-container');
const popupName = document.querySelector('.popup__text_name');
const popupAbout = document.querySelector('.popup__text_about');
const popupNameCard = document.querySelector('.popup__text_namecard');
const popupAddresCard = document.querySelector('.popup__text_adress-card');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_add-card');
const popupPicture = document.querySelector('.popup_picture');
const cardsContainer = document.querySelector('.elements__cards');
const popupImage = document.querySelector('.popup__image');
const popupTextPicture = document.querySelector('.popup__text-picture');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');



//функция открытия попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};
//слушатель события при нажатии по кнопке открытия
profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
});
profileAddButton.addEventListener('click', function () {
  openPopup(popupCard);
});

//фунуция закрытия попапов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};
//обработчик кнопок закрытия попапов
popupCloseButtons.forEach(function(item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', function() {
    closePopup(popup);
  });
});

//функция добавления текста в профиль
function addProfileText(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup(popupProfile);
};
//слушатель события вызывающий колбэк функцию добавления текста в профиль
popupInputContainer.addEventListener('submit', addProfileText);

//переменная содержащая массив для добавления карточек с помощью Js 
const initialCards = [
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
//функция создания карточки
function createCard(name, link) {
  const templateElement = document.querySelector('.template-card').content;
  const cardItem = templateElement.querySelector('.elements__item').cloneNode(true);
  const elementImage = cardItem.querySelector('.elements__image');
  const elementText = cardItem.querySelector('.elements__text');
  elementImage.src = link;
  elementImage.alt = name;
  elementText.textContent = name;
 //добавляем работу кнопки "лайков"
  cardItem.querySelector('.elements__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });
//кнопка корзины 
  cardItem.querySelector('.elements__trash-button').addEventListener('click', function() {
    cardItem.remove();
  });
//слушатель вызвающий открытие картинки при нажатиии картинку карточки
  elementImage.addEventListener('click', function(){
    openPopup(popupPicture);
    popupImage.src = link;
    popupImage.alt = name;
    popupTextPicture.textContent = name;
  });
  
  return cardItem;
}
//функция добавления карточки
function addCard(nameValue, linkValue){
  const cardItem = createCard(nameValue, linkValue);
  cardsContainer.prepend(cardItem);
}
//обход массива для создания 6 стандартных карточек
initialCards.forEach(function(item){
  return addCard(item.name, item.link);
})

//слушатель для добавления своих карточек с помощью попапа
popupCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addCard(popupNameCard.value, popupAddresCard.value);
  evt.target.reset();
});