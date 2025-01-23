import React, { useEffect } from 'react'; // Импортируем React и хук useEffect

// Компонент для отслеживания прокрутки страницы
const ScrollTracker = () => {
  // Используем хук useEffect для выполнения побочных эффектов
  useEffect(() => {
    // Функция, которая обновляет значение --scrollTop в CSS
    const handleScroll = () => {
      // Устанавливаем значение --scrollTop равным текущей позиции прокрутки
      document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`);
    };

    // Добавляем обработчик события прокрутки
    window.addEventListener('scroll', handleScroll);

    // Очистка эффекта при размонтировании компонента
    return () => {
      // Удаляем обработчик события прокрутки
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании и размонтировании

  return null; // Компонент не рендерит никакого DOM-элемента
};

export default ScrollTracker; // Экспортируем компонент