import { useEffect, useState } from 'react';
import j from './jockeys.module.css'


const Main = () => {

    const [jockeys, setJockeys] = useState([]);
    const [isSorted, setIsSorted] = useState([]);

    useEffect(() => {
        const fetchJockeys = async () => {
            const res = await fetch('http://localhost:1337/api/jockeys?order=&filter=', {
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
        const res = await fetch('http://localhost:1337/api/jockeys?order=desc&filter=', {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            setJockeys(data);
            setIsSorted(true);
        }
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
                        <th className={j.data}>№</th>
                        <th className={j.data}>ID</th>
                        <th className={j.data}>ФИО</th>
                        <th className={j.data}>Возраст</th>
                        <th className={j.data}>Кол-во побед</th>
                    </tr>

                    {jockeys.map((i, index) =>
                        <tr className={j.row}>
                            <td className={j.data}>{index+1}</td>
                            <td className={j.data}>{i['jockey_id']}</td>
                            <td className={j.data}>{i['jockey_name']}</td>
                            <td className={j.data}>{i['jockey_age']}</td>
                            <td className={j.data}>{i['wins']}</td>
                        </tr>

                    )}

                </table>
            </div>

        </main>
    )
}

export default Main