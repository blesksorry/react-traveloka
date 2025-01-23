import React, { useState, useEffect } from "react"; // Импортируем React и хуки useState и useEffect
import "./css/SearchAttractions.scss"; // Импортируем стили

// Компонент для поиска и отображения достопримечательностей
const SearchAttractions = () => {
  // Состояния компонента
  const [searchQuery, setSearchQuery] = useState(""); // Поисковый запрос
  const [popularityFilter, setPopularityFilter] = useState("all"); // Фильтр по популярности
  const [attractions, setAttractions] = useState([]); // Список достопримечательностей
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница пагинации
  const [selectedAttraction, setSelectedAttraction] = useState(null); // Выбранная достопримечательность
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки данных
  const [error, setError] = useState(null); // Ошибка при загрузке данных
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Индекс текущего изображения в галерее
  const [isZoomed, setIsZoomed] = useState(false); // Состояние приближения изображения
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна

  const itemsPerPage = 3; // Количество элементов на странице

  // Эффект для загрузки данных при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://672ca4801600dda5a9f949f2.mockapi.io/attractions" // Запрос данных
        );
        if (!response.ok)
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`); // Проверка на ошибку
        const data = await response.json(); // Парсинг данных
        setAttractions(data); // Обновление состояния с данными
      } catch (err) {
        console.error("Ошибка загрузки:", err); // Логирование ошибки
        setError(err.message); // Установка ошибки в состояние
      } finally {
        setIsLoading(false); // Завершение загрузки
      }
    };

    fetchData(); // Вызов функции загрузки данных
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

  // Функция для обновления лайков
  const handleLike = async (id) => {
    try {
      const attraction = attractions.find((item) => item.id === id); // Поиск достопримечательности по ID
      if (!attraction) return;

      const updatedLikes = (attraction.likes || 0) + 1; // Увеличение количества лайков

      // Отправка запроса на обновление лайков
      const response = await fetch(
        `https://672ca4801600dda5a9f949f2.mockapi.io/attractions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: updatedLikes }),
        }
      );

      if (!response.ok) throw new Error("Ошибка при обновлении лайков");

      // Обновление состояния с новым количеством лайков
      const updatedAttractions = attractions.map((item) =>
        item.id === id ? { ...item, likes: updatedLikes } : item
      );
      setAttractions(updatedAttractions);
    } catch (err) {
      console.error("Ошибка:", err); // Логирование ошибки
    }
  };

  // Фильтрация и сортировка данных
  const getFilteredData = () => {
    let filtered = [...attractions]; // Копия массива достопримечательностей

    // Фильтрация по поисковому запросу
    if (searchQuery) {
      filtered = filtered.filter((attraction) =>
        attraction.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Сортировка по популярности
    if (popularityFilter === "highest") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (popularityFilter === "lowest") {
      filtered.sort((a, b) => a.popularity - b.popularity);
    }

    return filtered; // Возврат отфильтрованных данных
  };

  // Пагинация данных
  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage; // Начальный индекс для текущей страницы
    return data.slice(startIndex, startIndex + itemsPerPage); // Возврат данных для текущей страницы
  };

  // Обработчики событий
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Обновление поискового запроса
    setCurrentPage(1); // Сброс страницы на первую
  };

  const handleFilterChange = (e) => {
    setPopularityFilter(e.target.value); // Обновление фильтра по популярности
    setCurrentPage(1); // Сброс страницы на первую
  };

  const handlePageChange = (page) => setCurrentPage(page); // Изменение текущей страницы

  const handleAttractionClick = (attraction) => {
    setSelectedAttraction(attraction); // Установка выбранной достопримечательности
    setCurrentImageIndex(0); // Сброс индекса изображения
    setIsZoomed(false); // Сброс состояния приближения
  };

  const handleBackToList = () => setSelectedAttraction(null); // Возврат к списку достопримечательностей

  // Навигация по изображениям
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < selectedAttraction.photos.length - 1 ? prevIndex + 1 : 0
    ); // Переход к следующему изображению
    setIsZoomed(false); // Сброс состояния приближения
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : selectedAttraction.photos.length - 1
    ); // Переход к предыдущему изображению
    setIsZoomed(false); // Сброс состояния приближения
  };

  // Приближение изображения
  const handleImageZoom = () => {
    setIsZoomed(!isZoomed); // Переключение состояния приближения
  };

  // Открытие модального окна
  const openModal = () => setIsModalOpen(true);

  // Закрытие модального окна
  const closeModal = () => setIsModalOpen(false);

  // Данные для отображения
  const filteredData = getFilteredData(); // Отфильтрованные данные
  const paginatedData = getPaginatedData(filteredData); // Данные для текущей страницы

  // Рендеринг компонента
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  // Рендеринг деталей выбранной достопримечательности
  if (selectedAttraction) {
    return (
      <div className="attraction-details">
        <h2>{selectedAttraction.name}</h2>
        <div className="gallery">
          <div className="gallery-controls">
            <button onClick={handlePrevImage}>‹</button> {/* Кнопка предыдущего изображения */}
            <button onClick={handleNextImage}>›</button> {/* Кнопка следующего изображения */}
          </div>
          <div className="gallery-image-container">
            <img
              src={selectedAttraction.photos[currentImageIndex]}
              alt={`${selectedAttraction.name} - фото ${currentImageIndex + 1}`}
              className={`gallery-image ${isZoomed ? "zoomed" : ""}`}
              onClick={openModal} // Открытие модального окна при клике
            />
          </div>
          <div className="gallery-thumbnails">
            {selectedAttraction.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${selectedAttraction.name} - фото ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)} // Переход к выбранному изображению
                className={
                  index === currentImageIndex ? "active-thumbnail" : ""
                }
              />
            ))}
          </div>
        </div>
        <p>Город: {selectedAttraction.city}</p>
        <p>Посещаемость: {selectedAttraction.popularity}</p>
        <p>Описание: {selectedAttraction.description}</p>
        <p>Как добраться: {selectedAttraction.path}</p>
        <p>Лайков: {selectedAttraction.likes || 0}</p>

        {/* Встраиваем карту через iframe */}
        {selectedAttraction.map && (
          <iframe
            src={selectedAttraction.map}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        )}

        <button onClick={handleBackToList}>Назад к списку</button> {/* Кнопка возврата к списку */}
      </div>
    );
  }

  // Рендеринг основного интерфейса
  return (
    <div className="product">
      <h1 className="product__title">Достопримечательности России</h1>
      <div className="product__content">
        <input
          type="text"
          id="searchInput"
          placeholder="Введите название достопримечательности"
          value={searchQuery}
          onChange={handleSearchChange} // Обработчик изменения поискового запроса
        />
        <select
          id="popularityFilter"
          value={popularityFilter}
          onChange={handleFilterChange}
        >
          <option value="all">Все</option>
          <option value="highest">Наибольшая посещаемость</option>
          <option value="lowest">Наименьшая посещаемость</option>
        </select>
      </div>
      <div id="attractions">
        {paginatedData.map((attraction) => (
          <div
            key={attraction.id}
            className="attraction-card"
            onClick={() => handleAttractionClick(attraction)} // Обработчик клика по карточке
          >
            <img
              src={attraction.photos[0]}
              alt={attraction.name}
              className="attraction-card__image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder.jpg"; // Запасное изображение при ошибке загрузки
              }}
            />
            <div className="attraction-card__content">
              <h2 className="attraction-card__title">{attraction.name}</h2>
              <p className="attraction-card__city">Город: {attraction.city}</p>
              <p className="attraction-card__popularity">
                Посещаемость: {attraction.popularity}
              </p>
              <p className="attraction-card__likes">
                Лайков: {attraction.likes || 0}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(attraction.id);
                }}
              >
                ❤️ {/* Кнопка лайка */}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)} // Обработчик изменения страницы
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1} {/* Номер страницы */}
            </button>
          )
        )}
      </div>

      {/* Модальное окно для галереи */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-image-container">
              <img
                src={selectedAttraction.photos[currentImageIndex]}
                alt={`${selectedAttraction.name} - фото ${
                  currentImageIndex + 1
                }`}
                className={`gallery-image ${isZoomed ? "zoomed" : ""}`}
                onClick={handleImageZoom} // Обработчик приближения изображения
              />
            </div>
            <div className="gallery-thumbnails">
              {selectedAttraction.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${selectedAttraction.name} - фото ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)} // Переход к выбранному изображению
                  className={
                    index === currentImageIndex ? "active-thumbnail" : ""
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAttractions; // Экспорт компонента