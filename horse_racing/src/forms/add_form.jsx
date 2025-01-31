import ah from './add_form.module.css'
import { useEffect, useState } from 'react';

const Add = ({ isOpen, onCancel, nameType }) => {

    //const nameType = props.nameType;
    console.log(nameType)

    const [owners, setOwners] = useState([]);
    const [horses, setHorses] = useState([]);
    const [suits, setSuits] = useState([]);
    const [HorseformData, setHorseFormData] = useState({
        owner: '',
        horse: '',
        suit: '',
        age: '',
    })
    const [JockeyformData, setJockeyFormData] = useState({
        jockey: '',
        age: '',
    })

    let name, value;
    const handlerChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        if (nameType == 'horse') {
            setHorseFormData({ ...HorseformData, [name]: value })
        }
        if (nameType == 'jockey') {
            setJockeyFormData({ ...JockeyformData, [name]: value })
        }
        
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
            const res = await fetch('http://localhost:1337/api/owners?del=', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setOwners(data);
            }
        };
        const fetchHorses = async () => {
            const res = await fetch(`http://localhost:1337/api/horses?order=&filter=&owner=${HorseformData.owner}`, {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setHorses(data);
                const uniqueSuits = [...new Set(data.map(h => h.suit))];
                setSuits(uniqueSuits.map(suit => ({ suit })));
            }
        };

        fetchOwners();
        fetchHorses();
    }, []);

    const handlerSubmit = async (event) => {
        if (nameType === "horse") {
            if (!HorseformData.suit || HorseformData.suit == '' || HorseformData.owner == '' || !HorseformData.owner) {
                console.log('выберите все необходимые данные');
                return;
            }
            //event.preventDefault();
            console.log(HorseformData.id);
            console.log(HorseformData.horse);
            console.log(HorseformData.suit);
            console.log(HorseformData.age);
            const { owner, horse, suit, age } = HorseformData;
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
        if (nameType === "jockey") {
            if (!JockeyformData.jockey || JockeyformData.jockey == '' || JockeyformData.age == '' || !JockeyformData.age) {
                console.log('выберите все необходимые данные');
                return;
            }
            //event.preventDefault();
            console.log(JockeyformData.jockey);
            console.log(JockeyformData.age);
            
            const { jockey, age } = JockeyformData;
            const res = await fetch('http://localhost:1337/api/addjockey', {
                method: 'POST',
                headers: {
                    "Accept": "application/json", "Content-Type":
                        "application/json",
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify({
                    jockey,
                    age,
                }),
            });
            console.log(res.status);

            if (res.ok) {
                console.log("Жокей добавлен");
            }
            else {
                console.log("Жокей не добавлен");
                console.error(await res.json())
            }
        }
    }

    if (!isOpen) {
        return null;
    }

    if (nameType === "horse") {
        return (
            <div className={ah.window}>
                <div className={ah.main}>
                    <header className={ah.header}>
                        Добавление новой лошади
                    </header>
                    <main>
                        <form className={ah.form} onSubmit={handlerSubmit}>
                            <label className={ah.label} for="owner">Владелец</label>
                            <select className={ah.date} id='owner' name='owner' value={HorseformData.owner} onChange={handlerChange} required>
                                <option value={''}> </option>
                                {owners.map(h => <option value={h.owner_id} key={h.owner_id}>{h.owner_name} {h.owner_id}</option>)}
                            </select>

                            <label className={ah.label} for="horse">Кличка лошади</label>
                            <input type='text' id='horse' name='horse' className={ah.date} value={HorseformData.horse} onChange={handlerChange} required />

                            <label className={ah.label} for="suit">Масть</label>
                            <select className={ah.date} id='suit' name='suit' value={HorseformData.suit} onChange={handlerChange} required>
                                <option value={''}> </option>
                                {suits.map((h, index) => <option value={h.suit} key={index}>{h.suit}</option>)}
                            </select>

                            <label className={ah.label} for="age">Возраст</label>
                            <input id='age' name='age' type='number' className={ah.date} value={HorseformData.age} onChange={handlerChange} min={"0"} required />

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
    else if (nameType === "jockey") {

        return (
            <div className={ah.window}>
                <div className={ah.main}>
                    <header className={ah.header}>
                        Добавление нового жокея
                    </header>
                    <main>
                        <form className={ah.form} onSubmit={handlerSubmit}>

                            <label className={ah.label} for="jockey">ФИО жокея</label>
                            <input type='text' id='jockey' name='jockey' className={ah.date} value={JockeyformData.horse} onChange={handlerChange} required />

                            <label className={ah.label} for="age">Возраст</label>
                            <input id='age' name='age' type='number' className={ah.date} value={JockeyformData.age} onChange={handlerChange} min={"10"} required />

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

}

export default Add