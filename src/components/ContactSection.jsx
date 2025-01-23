import React, { useState, useEffect } from 'react'; // Импортируем React и хуки useState и useEffect
import facebook from "./img/facebook.svg"; // Импортируем иконку Facebook
import instagram from "./img/instagram.svg"; // Импортируем иконку Instagram
import twitter from "./img/twitter.svg"; // Импортируем иконку Twitter
import "./css/ContactSection.scss"; // Импортируем стили

// Компонент Contact для отображения секции контактов и формы обратной связи
const Contact = () => {
    // Состояние для управления открытием/закрытием модального окна
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Состояние для хранения данных формы
    const [formData, setFormData] = useState({
        name: '', // Имя пользователя
        email: '', // Email пользователя
        message: '', // Сообщение пользователя
    });

    // Эффект для загрузки данных формы из localStorage при монтировании компонента
    useEffect(() => {
        const savedFormData = localStorage.getItem('formData'); // Получаем сохраненные данные
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData)); // Устанавливаем данные в состояние
        }
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

    // Эффект для сохранения данных формы в localStorage при их изменении
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData)); // Сохраняем данные в localStorage
    }, [formData]); // Зависимость от formData означает, что эффект выполнится при каждом изменении formData

    // Обработчик изменения значений полей формы
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Извлекаем имя поля и его значение
        setFormData(prev => ({ ...prev, [name]: value })); // Обновляем состояние формы
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        console.log('Форма отправлена:', formData); // Логируем данные формы
        closeModal(); // Закрываем модальное окно
    };

    // Функция для закрытия модального окна
    const closeModal = () => setIsModalOpen(false);

    // Эффект для обработки нажатия клавиши Escape
    useEffect(() => {
        const handleEscape = (e) => e.key === 'Escape' && closeModal(); // Закрываем модальное окно при нажатии Escape
        window.addEventListener('keydown', handleEscape); // Добавляем обработчик события
        return () => window.removeEventListener('keydown', handleEscape); // Удаляем обработчик при размонтировании
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании и размонтировании

    // Рендеринг компонента
    return (
        <div className="main">
            {/* Заголовок секции */}
            <div className="main__title">
                <div className="main__title__small">Свяжитесь с нами</div>
                <h1 className="main__title__big">Traveloka</h1>
                {/* Список иконок социальных сетей */}
                <ul className="main__icons">
                    {[facebook, instagram, twitter].map((icon, index) => (
                        <li key={index}>
                            <a href="#">
                                <img src={icon} alt={['Facebook', 'Instagram', 'Twitter'][index]} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Блок с ссылками */}
            <div className="main__box">
                <a href="https://maps.app.goo.gl/QrZ25ri4FjGFfEkX7" className="main__item">
                    <span className="main__item__text">Наш офис</span>
                </a>
                <a href="#" className="main__item" onClick={() => setIsModalOpen(true)}>
                    <span className="main__item__text">Оставить форму</span>
                </a>
            </div>

            {/* Модальное окно для формы */}
            {isModalOpen && (
                <div className="modal open" onClick={closeModal}>
                    <div className="modal__content" onClick={e => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span> {/* Кнопка закрытия модального окна */}
                        <h2>Оставить форму</h2>
                        {/* Форма обратной связи */}
                        <form onSubmit={handleSubmit}>
                            {['name', 'email', 'message'].map((field, index) => (
                                <div key={index}>
                                    <label htmlFor={field}>{['Имя', 'Email', 'Описание маршрута'][index]}:</label>
                                    {field === 'message' ? (
                                        <textarea id={field} name={field} value={formData[field]} onChange={handleInputChange} required />
                                    ) : (
                                        <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} value={formData[field]} onChange={handleInputChange} required />
                                    )}
                                </div>
                            ))}
                            <button type="submit">Отправить</button> {/* Кнопка отправки формы */}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact; // Экспортируем компонент