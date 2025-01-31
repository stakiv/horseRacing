import ah from './delete_form.module.css'
import { useEffect, useState } from 'react';

const Delete = ({ isOpen, onCancel, nameType }) => {

    console.log(nameType)

    const [owners, setOwners] = useState([]);
    const [horses, setHorses] = useState([]);
    const [jockeys, setJockeys] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [HorseformData, setHorseFormData] = useState({
        horse: '',
    })
    const [JockeyformData, setJockeyFormData] = useState({
        jockey: '',
    })

    //let name, value;
    const handlerChange = (event) => {
        /*name = event.target.name;
        value = event.target.value;*/
        const { name, value } = event.target;
        if (nameType == 'horse') {
            if (name === 'owner') {
                setSelectedOwner(value);
                const horsesForOwner = horses.filter(h => h.owner_id === value);
                if (horsesForOwner.length == 1) {
                    setHorseFormData((prevformData) => ({ ...prevformData, horse: horsesForOwner.horse_id }));
                }
            }
            else {
                setHorseFormData((prevformData) => ({ ...prevformData, [name]: value }));
            }
        }
        if (nameType == 'jockey') {
            setJockeyFormData({ ...JockeyformData, [name]: value })
        }

    };


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
        const fetchJockeys = async () => {
            const res = await fetch('http://localhost:1337/api/jockeys?order=&filter=', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setJockeys(data);
            }
        };

        fetchOwners();
        fetchJockeys();
    }, []);

    useEffect(() => {
        if (selectedOwner) {
            const fetchHorses = async () => {
                const res = await fetch(`http://localhost:1337/api/horses?order=&filter=&owner=${selectedOwner}`, {
                    method: "GET"
                });
                if (res.ok) {
                    const data = await res.json()
                    setHorses(data);
                }
            };
            fetchHorses();
        }

    }, [selectedOwner]);

    const handlerSubmit = async (event) => {
        if (nameType === "horse") {
            if (!HorseformData.horse || HorseformData.horse == '') {
                console.log('выберите все необходимые данные');
                return;
            }
            //event.preventDefault();
            console.log(HorseformData.horse);

            const horseid = HorseformData.horse;
            const res = await fetch(`http://localhost:1337/api/deletehorse?horse=${horseid}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json", "Content-Type":
                        "application/json",
                    'Origin': 'http://localhost:3000'
                },
            });
            console.log(res.status);

            if (res.ok) {
                console.log("Лошадь удалена");
            }
            else {
                console.log("Лошадь не удалена");
                console.error(await res.json())
            }
        }
        if (nameType === "jockey") {
            if (!JockeyformData.jockey || JockeyformData.jockey == '') {
                console.log('выберите все необходимые данные');
                return;
            }
            //event.preventDefault();
            console.log(JockeyformData.jockey);

            const jockeyid = JockeyformData.jockey;
            const res = await fetch(`http://localhost:1337/api/deletejockey?jockey=${jockeyid}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json", "Content-Type":
                        "application/json",
                    'Origin': 'http://localhost:3000'
                },
            });
            console.log(res.status);

            if (res.ok) {
                console.log("Жокей удален");
            }
            else {
                console.log("Жокей не удален");
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
                    Удаление лошади
                </header>
                <main>
                    <form className={ah.form} onSubmit={handlerSubmit}>
                        <label className={ah.label} for="owner">Владелец</label>
                        <select className={ah.date} id='owner' name='owner' onChange={handlerChange} required>
                            {owners.map(h => <option value={h.owner_id} key={h.owner_id}>{h.owner_name} {h.owner_id}</option>)}
                        </select>


                        <label className={ah.label} for="horse">Лошадь</label>
                        <select className={ah.date} id='horse' name='horse' value={horses.length == 1 ? horses.horse_id : HorseformData.horse} onChange={handlerChange} required>
                            <option value={''}> </option>
                            {horses.map(h => <option value={h.horse_id} key={h.horse_id}>{h.horse_name}</option>)}
                        </select>

                        <div className={ah.buttons}>
                            <button className={ah.button + " " + ah.add} type='submit'>Удалить</button>
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
                    Удаление жокея
                </header>
                <main>
                    <form className={ah.form} onSubmit={handlerSubmit}>
                        <label className={ah.label} for="jockey">Жокей</label>
                        <select className={ah.date} id='jockey' name='jockey' value={JockeyformData.jockey} onChange={handlerChange} required>
                        <option value={''}> </option>
                            {jockeys.map(h => <option value={h.jockey_id} key={h.jockey_id}>{h.jockey_name} {h.jockey_id}</option>)}
                        </select>

                        <div className={ah.buttons}>
                            <button className={ah.button + " " + ah.add} type='submit'>Удалить</button>
                            <button className={ah.button + " " + ah.cancel} onClick={onCancel}>Отменить</button>
                        </div>

                    </form>
                </main>
            </div>
        </div>
        )

    }

}

export default Delete