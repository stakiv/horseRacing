import { useEffect, useState } from 'react'
import r from './race_item.module.css'

const Race = (props) => {
    const [races, setRaces] = useState([]);
    const id = props.race_id;
    const race = props.name;
    useEffect(() => {
        const fetchRaceData = async () => {
            const res = await fetch('http://localhost:1337/api/raceitem?raceid=' + `${id}`, {
                method: "GET",
                headers: { "Accept": "application/json", "Content-Type":
                "application/json" }
            });
            if (res.ok) {
                const data = await res.json()
                setRaces(data);
            }
        };
        fetchRaceData();
    }, [])

    return (
        <div className={r.main}>
            <table className={r.item}>

                <header className={r.item_header}>
                    Заезд № {id} "{race}"
                </header>
                <tr className={r.row}>
                    <th className={r.data}>№</th>
                    <th className={r.data}>Лошадь</th>
                    <th className={r.data}>Жокей</th>
                    <th className={r.data}>Время</th>
                </tr>

                {races.map((i, index) =>
                    <tr className={r.row}>
                        <td className={r.data}>{index + 1}</td>
                        <td className={r.data}>{i.horse_name}</td>
                        <td className={r.data}>{i.jockey_name}</td>
                        <td className={r.data}>{i.time}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default Race