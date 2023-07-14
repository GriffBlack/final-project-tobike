import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../utils/checkAuth';
import { getOfficers } from '../../services/officers';
// import ListItem from '../../components/ListItem/ListItem';
import css from './officers.module.scss';

const Officers = () => {
  const userData = useSelector((state) => state.user);
  const location = useNavigate();
  const [officers, setOfficers] = useState(null);
  const [message, setMessage] = useState(null);
  const officerIsLoaded = userData.data && userData.status === 'fulfilled' && officers;

  useEffect(() => {
    if (checkAuth(userData.data, userData.status)) {
      getOfficers()
        .then((data) => setOfficers(data.officers))
        .catch(() => setMessage('Ошибка при получении данных о сотруднике'));
    } else {
        location('/');
        console.log(1)
    }
  }, [userData.data, userData.status, location]);

    // return <div className="offices">
    //     of
    // </div>
  return (
    <section>
      {message ? (
        <p className="error-message">Ошибка при получении данных сотрудника</p>
      ) : officerIsLoaded && !message ? (
        <>
          <ul className={css.officers}>
            {officers.map((item) => (
                    <li className={css.listItem}>
        <ul className="details">
          {/* {officerDetails.map((item) => (
            <DetailsItem name={item.name} value={item[`${item.value}`]} key={item.id} />
          ))} */}
        </ul>
        <Link to={`/officers/id=${item._id}`} className={css.listItemLink}>
          Подробнее
        </Link>
      </li>
            ))}
          </ul>
          <Link to={'/officers/create'} className={css.officersLink}>
            Добавить сотрудника
          </Link>
        </>
      ) : null}
    </section>
  );
};

export default Officers;
