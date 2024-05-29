import { useEffect, useState } from 'react';
import j from './horses.module.css'
/*
const horses = [
    {
        id: 0,
        name: "Star",
        suit: "Соловая",
        age: 3,
        owner: "Куликова Мария",
        wins: 8,
    },
    {
        id: 1,
        name: "Moon",
        suit: "Буланая",
        age: 4,
        owner: "Леонов Кирилл",
        wins: 2,
    }

]*/

const Main = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const orderby = urlParams.get('orderby');

    const [horses, setHorses] = useState([]);
    const [resList, SetResList] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getHorses = async () => {
            const res = await fetch('http://localhost:1337/api/horses?order=' + orderby, {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                SetResList(data);
                setIsLoading(false)
            }
        }
        getHorses();
    })
    if (isLoading) {
        return <div>Загрузка...</div>
    }
    return (
        <main className={j.main}>
            <div className={j.sort}>
                Сортировать по
                <div className={j.option}>
                    <input type='button' value={"Количество побед"} className={j.date} onClick={handleOrder}/>
                </div>
            </div>
            <div className={j.items}>
                <div className={j.marg}>
                    <table className={j.item}>

                        <tr className={j.row}>
                            <th className={j.data}>ID</th>
                            <th className={j.data}>Кличка</th>
                            <th className={j.data}>Масть</th>
                            <th className={j.data}>Возраст</th>
                            <th className={j.data}>Владелец</th>
                            <th className={j.data}>Кол-во побед</th>
                        </tr>

                        {resList && resList.map(i =>
                            <tr className={j.row}>
                                <td className={j.data}>{i['horse_id']}</td>
                                <td className={j.data}>{i['horse_name']}</td>
                                <td className={j.data}>{i['suit']}</td>
                                <td className={j.data}>{i['horse_age']}</td>
                                <td className={j.data}>{i['owner_id']}</td>
                                <td className={j.data}>{i['horse_wins']}</td>
                            </tr>

                        )}

                    </table>
                </div>
            </div>

        </main>
    )
}

export default Main