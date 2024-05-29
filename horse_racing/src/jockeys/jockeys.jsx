import { useEffect, useState } from 'react';
import j from './jockeys.module.css'


const Main = () => {

    const [jockeys, setJockeys] = useState([]);
    const [isSorted, setIsSorted] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJockeys = async () => {
            const res = await fetch('http://localhost:1337/api/jockeys?order=', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setJockeys(data);
            }
        };
        fetchJockeys();
    }, []);
    const sortedJockeys = async () => {
        const res = await fetch('http://localhost:1337/api/jockeys?order=asc', {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            setJockeys(data);
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
                    <input type='button' value={"Количество побед"} className={j.date} onClick={sortedJockeys}/>
                </div>
            </div>
            <div className={j.items}>
                <table className={j.item}>

                    <tr className={j.row}>
                        <th className={j.data}>ID</th>
                        <th className={j.data}>ФИО</th>
                        <th className={j.data}>Возраст</th>
                        <th className={j.data}>Кол-во побед</th>
                    </tr>

                    {jockeys.map(i =>
                        <tr className={j.row}>
                            <td className={j.data}>{i['jockey_id']}</td>
                            <td className={j.data}>{i['jockey_name']}</td>
                            <td className={j.data}>{i['jockey_age']}</td>
                            <td className={j.data}>{i['jockey_wins']}</td>
                        </tr>

                    )}

                </table>
            </div>

        </main>
    )
}

export default Main