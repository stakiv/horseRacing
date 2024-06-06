import ah from './delete_horse.module.css'
import { useEffect, useState } from 'react';

const Delete = ({ isOpen, onCancel }) => {

    const [owners, setOwners] = useState([]);
    const [horses, setHorses] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState(null);

    const [formData, setFormData] = useState({
        owner: '',
        horse: '',
    })

    let name, value;
    const handlerChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setFormData({ ...formData, [name]: value })
        if (name === 'owner') {
            setSelectedOwner(value);
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
            const res = await fetch('http://localhost:1337/api/owners?del=1', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setOwners(data);
            }
        };
        /*
        const fetchHorses = async () => {
            const res = await fetch(`http://localhost:1337/api/horses?order=&filter=&owner=${formData.owner}`, {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setHorses(data);
            }
        };*/

        fetchOwners();
        //fetchHorses();
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
        //event.preventDefault();
        console.log(formData.horse);
        const { owner, horse} = formData;
        const res = await fetch('http://localhost:1337/api/deletehorse', {
            method: 'DELETE',
            headers: {
                "Accept": "application/json", "Content-Type":
                    "application/json",
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({
                owner,
                horse,
            }),
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

    if (!isOpen) {
        return null;
    }
    return (
        <div className={ah.window}>
            <div className={ah.main}>
                <header className={ah.header}>
                    Удаление лошади
                </header>
                <main>
                    <form className={ah.form} onSubmit={handlerSubmit}>
                        <label className={ah.label} for="owner">Владелец</label>
                        <select className={ah.date} id='owner' name='owner' value={formData.owner} onChange={handlerChange} required>
                            {owners.map(h => <option value={h.owner_id} key={h.owner_id}>{h.owner_name} {h.owner_id}</option>)}
                        </select>


                        <label className={ah.label} for="horse">Лошадь</label>
                        <select className={ah.date} id='horse' name='horse' value={formData.horse} onChange={handlerChange} required>
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

export default Delete