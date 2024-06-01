import ah from './add_horse.module.css'
import { useEffect, useState } from 'react';

const Add = ({ isOpen, onCancel }) => {

    const [owners, setOwners] = useState([]);
    const [horses, setHorses] = useState([]);
    const [optionOwner, setOptionOwner] = useState('');
    const [optionSuit, setOptionSuit] = useState('');
    const [optionHorse, setOptionHorse] = useState('');
    const [optionAge, setOptionAge] = useState('');


    const handleOptionOwner = ({ target: { value } }) => {
        setOptionOwner(value);
        console.log(optionOwner);
    };
    const handleOptionSuit = ({ target: { value } }) => {
        setOptionSuit(value);
        console.log(optionSuit);
    };
    const handleOptionHorse = ({ target: { value } }) => {
        setOptionHorse(value);
        console.log(optionHorse);
    };
    const handleOptionAge = ({ target: { value } }) => {
        setOptionAge(value);
        console.log(optionAge);
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

    const handlerSubmit = async ({ target: { value } }) => {
        const data = new FormData();
        data.append('id', optionOwner);
        data.append('horse', optionHorse);
        data.append('owner', optionSuit);
        data.append('owner', optionAge);
        console.log(optionHorse);
        /*
        const id = value.optionOwner;
        const horse = value.optionHorse;
        const suit = value.optionSuit;
        const age = value.optionAge;*/

        const res = await fetch('http://localhost:1337/api/horses', {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: data
        });
        if (res.ok) {
            console.log("Лошадь добавлена");
            console.log(data);
        }
        else {
            console.log("Лошадь не добавлена");
            console.log(data);
        }
    }

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
                    <form className={ah.form} onSubmit={handlerSubmit}>
                        <label className={ah.label} for="owner">Владелец</label>
                        <select className={ah.date} id='owner' name='owner' value={optionOwner} onChange={handleOptionOwner} required>
                            {owners.map(h => <option key={h.owner_id} value={h.owner_id}>{h.owner_name}</option>)}
                        </select>

                        <label className={ah.label} for="horse">Кличка лошади</label>
                        <input type='text' id='horse' name='horse' minLength={"2"} className={ah.date} value={optionHorse} onChange={handleOptionHorse} required />

                        <label className={ah.label} for="suit">Масть</label>
                        <select className={ah.date} id='suit' name='suit' value={optionSuit} onChange={handleOptionSuit} required>
                            {horses.map(h => <option key={h.horse_id} value={h.suit}>{h.suit}</option>)}
                        </select>

                        <label className={ah.label} for="age">Возраст</label>
                        <input id='age' name='age' type='number' className={ah.date} value={optionAge} onChange={handleOptionAge} required />

                        <div className={ah.buttons}>
                            <button className={ah.button + " " + ah.add} type='submit'>Добавить</button>
                            <button className={ah.button + " " + ah.cancel} onClick={onCancel}>Отменить</button>
                        </div>

                    </form>
                </main>
            </div>
        </div>
    )
}

export default Add