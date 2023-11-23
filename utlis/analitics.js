
// Карточка центра
export const centerCard= (center) => dataLayer?.push({"event": `center-card--${center?.code}`})

// Клик по карточки
export const lessonCard = (subject) => dataLayer?.push({"event": `lesson-card--${subject?.code}`})

// Клик по кнопке карточки
export const lessonCardButton = (subject) => dataLayer?.push({"event": `lesson-card-button--${subject?.code}`})

// Фильтр урока
export const lessonSubjectCatalogClick = (subjectCode) => dataLayer?.push({"event": `lesson-catalog-subject--${subjectCode}`})

// Фильтр центра
export const categoryCenterCatalogClick = (categoryCode) => dataLayer?.push({"event": `center-catalog-center--${categoryCode}`})

// Предмет главной страницы
export const mainPageSubjectClick = (subjectCode) => dataLayer?.push({"event": `main-page-subject--${subjectCode}`})

// Вид карты
export const mapViewLessons = () => dataLayer?.push({"event": `map-view-lessons`})

export const mapPoint = () => dataLayer?.push({"event": `map-point`})

// Отправить код
export const sendCode = () => dataLayer?.push({"event": `send-code`})

// Войти
export const successLogin = () => dataLayer?.push({"event": `success-login`})

// Войти
export const errorLogin = () => dataLayer?.push({"event": `error-login`})

// Запись
export const registrationTrial = () => dataLayer?.push({"event": `registration-trial`})

// Клик whatsapp
export const whatsappClick = () => dataLayer?.push({"event": `whatsapp-click`})

// Клик phone
export const phoneClick = () => dataLayer?.push({"event": `phone-click`})

// Выбор группы
export const selectGroupLesson = () => dataLayer?.push({"event": `select-group-lesson`})

// Выбор даты пробного
export const selectTrialDateLesson = () => dataLayer?.push({"event": `select-trial-date-center`})

// Смотреть еще главная страница
export const paginationMainPage = () => dataLayer?.push({"event": `pagination-main-page`})

// Смотреть еще каталог уроки
export const paginationCatalogLessons = () => dataLayer?.push({"event": `pagination-catalog-lessons`})

// Смотреть еще каталог центры
export const paginationCatalogCenters = () => dataLayer?.push({"event": `pagination-catalog-centers`})