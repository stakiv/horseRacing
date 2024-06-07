import m from './races.module.css'
import r from './race_item.module.css'
import Race from './race_item'
import { useEffect, useState } from 'react'


const Main = () => {

    const [optionRacetrack, setOptionRacetrack] = useState('');
    const [optionDate, setOptionDate] = useState('');
    const [optionHorse, setOptionHorse] = useState('');
    const [optionJockey, setOptionJockey] = useState('');
    const [racetracks, setRacetracks] = useState([]);
    const [races, setRaces] = useState([]);
    const [horses, setHorses] = useState([]);
    const [jockeys, setJockeys] = useState([]);

    const handleOptionChangeRacetrack = ({ target: { value } }) => {
        setOptionRacetrack(value)
    };
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
        const fetchRacetracks = async () => {
            const res = await fetch('http://localhost:1337/api/racetracks', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setRacetracks(data);
            }
        };
        const fetchRaces = async () => {
            let url = 'http://localhost:1337/api/races?';
            if (optionHorse || optionDate || optionJockey || optionRacetrack) {
                if (optionRacetrack) {
                    url += `racetrack=${optionRacetrack}`
                } else { url += `racetrack=` }
                if (optionDate) {
                    url += `date=${optionDate}`
                } else { url += `date=` }
                if (optionHorse) {
                    url += `&horse=${optionHorse}`
                } else { url += `&horse=` }
                if (optionJockey) {
                    url += `&jockey=${optionJockey}`
                } else { url += `&jockey=` }
            }
            else {
                url += `racetrack=&date=&horse=&jockey=`
            }
            console.log(url);
            console.log(optionRacetrack);
            console.log(optionHorse);
            console.log(optionDate);
            console.log(optionJockey);
            const res = await fetch(url, {
                method: "GET",
                headers: { "Accept": "application/json", "Content-Type":
                "application/json" }
            });
            if (res.ok) {
                const data = await res.json()
                setRaces(data);
                
            }
        };
        const fetchHorses = async () => {
            const res = await fetch('http://localhost:1337/api/horses?order=&filter=names&owner=', {
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

        fetchRacetracks();
        fetchRaces();
        fetchHorses();
        fetchJockeys();
    }, [optionDate, optionHorse, optionJockey, optionRacetrack]);

    return (

        <main className={m.main}>

            <div className={m.filters}>
            <div className={m.option}>
                    <div>Ипподром</div>
                    <select className={m.date} value={optionRacetrack} onChange={handleOptionChangeRacetrack}>
                        <option value={""}>Все</option>
                        {racetracks.map(h => <option key={h.racetrack_id} value={h.racetrack_id}>{h.racetrack_name}</option>)}
                    </select>
                </div>

                <div className={m.option}><div>Дата</div>
                    <input type='date' value={optionDate} className={m.date} onChange={handleOptionChangeDate} /></div>

                <div className={m.option}>
                    <div>Лошадь</div>
                    <select className={m.date} value={optionHorse} onChange={handleOptionChangeHorse}>
                        <option value={""}>Все</option>
                        {horses.map(h => <option key={h.horse_id} value={h.horse_name}>{h.horse_name}</option>)}
                    </select>
                </div>

                <div className={m.option}>
                    <div>Жокей</div>
                    <select className={m.date} value={optionJockey} onChange={handleOptionChangeJockey}>
                    <option value={""}>Все</option>
                        {jockeys.map(h => <option key={h.jockey_id} value={h.jockey_name}>{h.jockey_name}</option>)}
                    </select>
                </div>
            </div>
            <div className={m.items}>
                {races.map((race) => (
                    
                    <Race race_id={race['race_id']} race_name={race['name']} date={race['date']}/>
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