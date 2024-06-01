import ah from './add_horse.module.css'
import { useEffect, useState } from 'react';

const Add = ({ isOpen, onAdd, onCancel }) => {
    
    const [owners, setOwners] = useState([]);
    const [horses, setHorses] = useState([]);
    const [optionOwner, setOptionOwner] = useState('');
    const [optionSuit, setOptionSuit] = useState('');
    const [optionHorse, setOptionHorse] = useState('');
    const [optionAge, setOptionAge] = useState('');

    const handleOptionOwner = ({ target: { value } }) => {
        setOptionOwner(value)
    };
    const handleOptionSuit = ({ target: { value } }) => {
        setOptionSuit(value)
    };
    const handleOptionHorse = ({ target: { value } }) => {
        setOptionHorse(value)
    };
    const handleOptionAge = ({ target: { value } }) => {
        setOptionAge(value)
    };

    useEffect(() => {
        const fetchOwners = async () => {
            const res = await fetch('http://localhost:1337/api/owners', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setOwners(data);
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

        fetchOwners();
        fetchHorses();
    }, []);

    
    if (!isOpen) {
        return null;
    }
    return (
        <div className={ah.window}>
            <div className={ah.main}>
                <header className={ah.header}>
                    Добавление новой лошади
                </header>
                <main>
                    <form className={ah.form}>
                        <label className={ah.label} for="owner">Владелец</label>
                        <select className={ah.date} id='owner' name='owner' value={optionOwner} onChange={handleOptionOwner} required>
                            {owners.map(h => <option key={h.owner_id} value={h.owner_id}>{h.owner_name}</option>)}
                        </select>

                        <label className={ah.label} for="horse">Кличка лошади</label>
                        <input type='text' id='horse' name='horse' minLength={"2"} className={ah.date} onChange={handleOptionHorse} required />

                        <label className={ah.label} for="suit">Масть</label>
                        <select className={ah.date} id='suit' name='suit' value={optionSuit} onChange={handleOptionSuit} required>
                            {horses.map(h => <option key={h.horse_id} value={h.suit}>{h.suit}</option>)}
                        </select>

                        <label className={ah.label} for="age">Возраст</label>
                        <input id='age' name='age' type='number' className={ah.date} onChange={handleOptionAge} required />

                        <div className={ah.buttons}>
                            <button className={ah.button + " " + ah.add} onClick={onAdd}>Добавить</button>
                            <button className={ah.button + " " + ah.cancel} onClick={onCancel}>Отменить</button>
                        </div>

                    </form>
                </main>
            </div>
        </div>
    )
}

export default Add