import { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../utils/checkAuth';
import { getOfficers } from '../../services/officers';
import css from './officers.module.scss';

const Officers = () => {
    const userData = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [officers, setOfficers] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (checkAuth(userData.user, userData.status)) {
        getOfficers()
            .then((data) => setOfficers(data.officers))
            .catch(() => setMessage('Ошибка при получении данных о сотруднике'));
        } else {
        navigate('/');
        }
    }, [userData.user, userData.status, navigate]);
    let content;
    if (!message && officers) {
        content = (
            <>
            <ul className={css.officers}>
                {officers.map((item) => (
                    <li>
                        <Link to={`/officers/:${item._id}`}>
                            <div className={css.wrapperOfficer}>
                                <span>{`Email: ${item.email}`}</span>
                                <span>{`Имя: ${item.firstName}`}</span>
                                <span>{`Email: ${item.lastName}`}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to={'/officers/create'} className={css.officersLink}>
                Добавить сотрудника
            </Link>
            </>)
    } else if (message) {
        content = <p className="error-message">Ошибка при получении данных сотрудника</p>
    } else {content = <BeatLoader color="var(--primary)" />}
    return content;
    // return (
    //     <section>
    //     {message ? (
    //         <p className="error-message">Ошибка при получении данных сотрудника</p>
    //     ) : officerIsLoaded && !message ? (
    //         <>
    //         <ul className={css.officers}>
    //                         {officers.map((item) => (
    //                 <li>{item}</li>
    //             //   <ListItem officer={item} key={item._id} type="officer" />
    //             ))}
    //         </ul>
    //         <Link to={'/officers/create'} className={css.officersLink}>
    //             Добавить сотрудника
    //         </Link>
    //         </>
    //     ) : null}
    //     </section>
    // );
    // };
//   const userData = useSelector((state) => state.user);
//   const location = useNavigate();
//   const [officers, setOfficers] = useState(null);
//   const [message, setMessage] = useState(null);
//   const officerIsLoaded = userData.user && userData.status === 'fulfilled' && officers;

//     useEffect(() => {
        
//       console.log(userData.user)
//       console.log(userData.status)
//     if (checkAuth(userData.user, userData.status)) {
//       getOfficers()
//           .then((data) => {
//               setOfficers(data.officers);
//               console.log(14);
//               console.log(officers);
//               console.log(12);
//               console.log(userData.status);
//         })
//         .catch(() => setMessage('Ошибка при получении данных о сотруднике'));
//     } else {
//         location('/');
//         console.log(1)
//         }
//         console.log(officers);
//   }, [userData.user, userData.status, location]);


//   return (
//     <section>
//       {message ? (
//         <p className="error-message">Ошибка при получении данных сотрудника</p>
//       ) : !message && officerIsLoaded ? (
//         <>
//           <ul className={css.officers}>
//             {officers.map((item) => (
//                     <li className={css.listItem}>
//         <ul className="details">
//           {/* {officerDetails.map((item) => (
//             <DetailsItem name={item.name} value={item[`${item.value}`]} key={item.id} />
//           ))} */}
//         </ul>
//         <Link to={`/officers/id=${item._id}`} className={css.listItemLink}>
//           Подробнее
//         </Link>
//       </li>
//             ))}
//           </ul>
//           <Link to={'/officers/create'} className={css.officersLink}>
//             Добавить сотрудника
//           </Link>
//         </>
//       ) : null}
//     </section>
//   );
};

export default Officers;
