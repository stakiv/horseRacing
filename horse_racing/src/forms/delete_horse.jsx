import ah from './delete_horse.module.css'
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


const Delete = ({ isOpen, onCancel }) => {

    const [owners, setOwners] = useState([]);
    const [horses, setHorses] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState(null);

    const [formData, setFormData] = useState({
        horse: '',
    })

    const handlerChange = (event) => {
        const {name, value} = event.target;
        /*
        name = event.target.name;
        value = event.target.value;*/
        
        if (name === 'owner') {
            setSelectedOwner(value);
            const horsesForOwner = horses.filter(h => h.owner_id === value);
            if (horsesForOwner.length == 1) {
                setFormData((prevformData) => ({...prevformData, horse:horsesForOwner.horse_id}));
            }
        }
        else {
            setFormData((prevformData) => ({ ...prevformData, [name]: value }));
        }
    };
    


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
        
        fetchOwners();
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
        if (!formData.horse || formData.horse == '') {
            console.log('выберите лошадь');
            return;
        }
        const horseid = formData.horse;
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
                        <select className={ah.date} id='owner' name='owner' onChange={handlerChange} required>
                            {owners.map(h => <option value={h.owner_id} key={h.owner_id}>{h.owner_name} {h.owner_id}</option>)}
                        </select>


                        <label className={ah.label} for="horse">Лошадь</label>
                        <select className={ah.date} id='horse' name='horse' value={horses.length == 1 ? horses.horse_id : formData.horse} onChange={handlerChange} required>
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

export default Delete