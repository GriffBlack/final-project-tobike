import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getReport, removeReport } from '../../services/reports';
import { getOfficer, removeOfficer } from '../../services/officers';
// import DetailsItem from '../../components/DetailsItem/DetailsItem';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../utils/checkAuth';
// import DeleteButton from '../../components/DeleteButton/DeleteButton';
// import EditLink from '../../components/EditLink/EditLink';
import css from './details.module.scss';

const reportsDetails = [
  { id: 1, name: 'ФИО владельца', value: 'ownerFullName' },
  { id: 2, name: 'Номер лицензии', value: 'licenseNumber' },
  { id: 3, name: 'Цвет', value: 'color' },
  { id: 4, name: 'Тип', value: 'type' },
  { id: 5, name: 'Доп. информация', value: 'description' },
  { id: 6, name: 'Статус', value: 'status' },
  { id: 7, name: 'Сотрудник', value: 'officer' },
  { id: 8, name: 'Решение', value: 'resolution' },
];

const officersDetails = [
  { id: 1, name: 'Имя', value: 'firstName' },
  { id: 2, name: 'Фамилия', value: 'lastName' },
  { id: 3, name: 'Email', value: 'email' },
];

const Details = () => {
    const userData = useSelector((state) => state.user);
    const location = useNavigate();
    const [message, setMessage] = useState(null);
    const [officer, setOfficer] = useState(null);
    const {id} = useParams();

  useEffect(() => {
      if (checkAuth(userData.user, userData.status)) {
        getOfficer(id.split(':', 1))
            .then((data) => { setOfficer(data.data)})
          .catch((data) => setMessage(data.response.data.message));
    } else {
      location('/');
    }
  }, [id, userData.user, userData.status, location]);

    return (
      <section>
        {officer && (
          <>
                    {officersDetails.map((item) => (
                <>{item.name}</>
            //   <DetailsItem name={item.name} value={officer[`${item.value}`]} key={item.id} />
            ))}

            <div className={css.actions}>
                {userData.user.id !== officer._id && (
                <button>Удалить</button>
                )}
                <button>Редактировать</button>
            </div>      
          </>
        )}
            {message && <p className="error-message">{message}</p>}
            {console.log(userData)}
      </section>
    );
    // let content;
    // if (!message && officer) {
    //     content = (
    //         <>
    //         <ul className={css.officer}>
    //             {officer.map((item) => (
    //                 <li>
    //                     <Link to={`/officers/:${item._id}`}>
    //                         <div className={css.wrapperOfficer}>
    //                             <span>{`Email: ${item.email}`}</span>
    //                             <span>{`Имя: ${item.firstName}`}</span>
    //                             <span>{`Email: ${item.lastName}`}</span>
    //                         </div>
    //                     </Link>
    //                 </li>
    //             ))}
    //         </ul>
    //         <Link to={'/officers/create'} className={css.officersLink}>
    //             Добавить сотрудника
    //         </Link>
    //         </>)
    // } else if (message) {
    //     content = <p className="error-message">Ошибка при получении данных сотрудника</p>
    // } else {content = <h2>Loading...</h2>}
    // return content;
};

export default Details;