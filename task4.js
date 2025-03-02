import React, { useState } from 'react';
import axios from 'axios';

const HHSearchWidget = () => {
  const [searchText, setSearchText] = useState('');
  const [vacancies, setVacancies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.get('https://api.hh.ru/vacancies', {
        params: {
          text: searchText,
          area: 1, 
          per_page: 10, 
        },
      });
      
      if (response.data.items.length > 0) {
        setVacancies(response.data.items);
        setErrorMessage(null);
      } else {
        setErrorMessage('По вашему запросу ничего не найдено.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Произошла ошибка при выполнении запроса.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchText}
          placeholder="Введите название вакансии..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">Найти</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {vacancies.map((vacancy) => (
        <div key={vacancy.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
          <h4><a href={vacancy.alternate_url}>{vacancy.name}</a></h4>
          <p><strong>Компания:</strong> {vacancy.employer.name}</p>
          <p><strong>Город:</strong> {vacancy.area.name}</p>
          <p><strong>Зарплата:</strong> {vacancy.salary ? `${vacancy.salary.from} - ${vacancy.salary.to}` : 'Не указана'}</p>
        </div>
      ))}
    </div>
  );
};

export default HHSearchWidget;