import m from './races.module.css'
import Race from './race_item'
import { useEffect, useState } from 'react'


const Main = () => {

    const [isFiltered, setIsFiltered] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [races, setRaces] = useState([]);
    const [optionDate, setOptionDate] = useState('');
    const [optionHorse, setOptionHorse] = useState('');
    const [optionJockey, setOptionJockey] = useState('');
    const [horses, setHorses] = useState([]);
    const [jockeys, setJockeys] = useState([]);

    const handleOptionChangeDate = ({ target: { value } }) => {
        setOptionDate(value)
    };
    const handleOptionChangeHorse = ({ target: { value } }) => {
        setOptionHorse(value)
    };
    const handleOptionChangeJockey = ({ target: { value } }) => {
        setOptionJockey(value)
    }

    useEffect(() => {
        const fetchRaces = async () => {
            let url = 'http://localhost:1337/api/races?';
            if (optionHorse || optionDate || optionJockey) {
                if (optionDate) {
                    url += `date=${optionDate}`
                } else { url += `date=` }
                if (optionHorse) {
                    url += `horse=${optionHorse}`
                } else { url += `horse=` }
                if (optionJockey) {
                    url += `jockey=${optionJockey}`
                } else { url += `jockey=` }
            }
            else {
                url += `date=&horse=&jockey=`
            }
            const res = await fetch(url, {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setRaces(data);
            }
        };
        const fetchHorses = async () => {
            const res = await fetch('http://localhost:1337/api/horses?order=&filter=names', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setHorses(data);
            }
        };
        const fetchJockeys = async () => {
            const res = await fetch('http://localhost:1337/api/jockeys?order=&filter=names', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setJockeys(data);
            }
        };

        fetchRaces();
        fetchHorses();
        fetchJockeys();
    }, [optionDate, optionHorse, optionJockey]);

    return (

        <main className={m.main}>

            <div className={m.filters}>
                <div className={m.option}><div>Дата</div>
                    <input type='date' value={optionDate} className={m.date} onChange={handleOptionChangeDate} /></div>

                <div className={m.option}>
                    <div>Лошадь</div>
                    <select className={m.date} value={optionHorse} onChange={handleOptionChangeHorse}>
                        {horses.map(h => <option key={h.horse_id} value={h.horse_name}>{h.horse_name}</option>)}
                    </select>
                </div>

                <div className={m.option}>
                    <div>Жокей</div>
                    <select className={m.date} value={optionJockey} onChange={handleOptionChangeJockey}>
                        {jockeys.map(h => <option key={h.jockey_id} value={h.jockey_name}>{h.jockey_name}</option>)}
                    </select>
                </div>
            </div>
            <div className={m.items}>
                {races.map((race, index) => (
                    <div key={index} className={r.main}>

                        <table className={r.item}>

                            <header className={r.item_header}>
                                Заезд № {race.race_id} "{race.name}"
                            </header>
                            <thead>
                                <tr className={r.row}>
                                    <th className={r.data}>№</th>
                                    <th className={r.data}>Лошадь</th>
                                    <th className={r.data}>Жокей</th>
                                    <th className={r.data}>Время</th>
                                </tr>
                            </thead>

                            <tbody>
                                {race.horses.map((horse, hIndex) =>
                                    <tr key={`${index}-${hIndex}`} className={r.row}>
                                        <td className={r.data}>{hIndex + 1}</td>
                                        <td className={r.data}>{horse}</td>
                                        <td className={r.data}>{race.jockeys[hIndex]}</td>
                                        <td className={r.data}>{race.time[hIndex]}</td>
                                    </tr>

                                )}
                            </tbody>
                        </table>
                    </div>
                )
                    /*
                    <Race race_id={race.race_id} race={race.name} horses={[race.horse_name]} jockey={[race.jockey_name]} time={[race.time]}/>
                    */
                )}
            </div>
        </main>
    )
}

export default Main