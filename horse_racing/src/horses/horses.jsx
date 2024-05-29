import { useEffect, useState } from 'react';
import j from './horses.module.css'


const Main = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const orderby = urlParams.get('orderby');

    const [horses, setHorses] = useState([]);
    const [isSorted, setIsSorted] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHorses = async() => {
            const res = await fetch('http://localhost:1337/api/horses?order=', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setHorses(data);
            }
        };
        fetchHorses();
    }, []);
    const sortedHorses = async () => {
        const res = await fetch('http://localhost:1337/api/horses?order=asc', {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            setHorses(data);
            setIsSorted(true);
            setIsLoading(false)
        }
    }
    if (isLoading) {
        return <div>Загрузка...</div>
    }
    return (
        <main className={j.main}>
            <div className={j.sort}>
                Сортировать по
                <div className={j.option}>
                    <input type='button' name={"wins"} value={"Количество побед"} className={j.date} onClick={sortedHorses} />
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

                        {horses.map(i =>
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