import { useState } from 'react';
import j from './jockeys.module.css'
/*
const jockeys = [
    {
        id: 0,
        name: "Рябова Елизавета",
        age: 3,
        wins: 8,
    },
    {
        id: 1,
        name: "Леонова Екатерина",
        age: 3,
        wins: 8,
    },
    {
        id: 2,
        name: "Рябова Екатерина",
        age: 3,
        wins: 8,
    }
]*/

const Main = () => {
    const [jockeys, setJockeys] = useState([]);
    /*
    /jockeys
    /jockeys?sortProperty=wins
    [{
        "jockey_id": "4",
        "name": "РУРУРУ",
        "age": "25",
        "num_wins": "2"
    }]*/
    const handleClick = async (event) => {
        event.preventDefault();
        const res = await fetch('http://localhost:1337/api/jockeys', {
            method: "GET",
            headers: {
                "Accept": "application/json", "Content-Type": "application/json"
            };
            body: JSON.stringify({})
        })
    }
    return (
        <main className={j.main}>
            <div className={j.sort}>
                Сортировать по
                <div className={j.option}>
                    <input type='button' value={"Количество побед"}  className={j.date} onClick={handleClick}/>
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
                                <td className={j.data}>{i.id}</td>
                                <td className={j.data}>{i.name}</td>
                                <td className={j.data}>{i.age}</td>
                                <td className={j.data}>{i.wins}</td>
                            </tr>

                        )}
                    
                </table>
            </div>

        </main>
    )
}

export default Main