import ah from './add_horse.module.css'
import { useEffect, useState } from 'react';

const Add = ({ isOpen, onCancel }) => {

    const [owners, setOwners] = useState([]);
    const [horses, setHorses] = useState([]);

    const [formData, setFormData] = useState({
        owner: '',
        horse: '',
        suit: '',
        age: '',
    })

    let name, value;
    const handlerChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setFormData({...formData, [name]: value})
    };
    /*
    const handleOptionChange = (event) => {
        const { name, val } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: val,
        }));
    };*/


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

    const handlerSubmit = async (event) => {
        //event.preventDefault();
        console.log(formData.id);
        console.log(formData.horse);
        console.log(formData.suit);
        console.log(formData.age);
        const {owner, horse, suit, age} = formData;
        const res = await fetch('http://localhost:1337/api/addhorse', {
            method: 'POST',
            headers: {
                "Accept": "application/json", "Content-Type":
                "application/json",
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({
                owner,
                horse,
                suit,
                age,
            }),
        });
        console.log(res.status);

        if (res.ok) {
            console.log("Лошадь добавлена");
        }
        else {
            console.log("Лошадь не добавлена");
            console.error(await res.json())
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
                        <select className={ah.date} id='owner' name='owner' value={formData.owner} onChange={handlerChange} required>
                            {owners.map(h => <option value={h.owner_id} key={h.owner_id}>{h.owner_name} {h.owner_id}</option>)}
                        </select>

                        <label className={ah.label} for="horse">Кличка лошади</label>
                        <input type='text' id='horse' name='horse' className={ah.date} value={formData.horse} onChange={handlerChange} required />

                        <label className={ah.label} for="suit">Масть</label>
                        <select className={ah.date} id='suit' name='suit' value={formData.suit} onChange={handlerChange} required>
                            {horses.map(h => <option value={h.suit} key={h.horse_id}>{h.suit}</option>)}
                        </select>

                        <label className={ah.label} for="age">Возраст</label>
                        <input id='age' name='age' type='number' className={ah.date} value={formData.age} onChange={handlerChange} min={"0"} required />

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