import ah from './add_horse.module.css'

const Add = () => {
    const [owners, setOwners] = useState([]);
    const [horses, setHorses] = useState([]);
    const [optionOwner, setOptionOwner] = useState('');
    const [optionSuit, setOptionSuit] = useState('');
    const handleOptionChangeOwner = ({ target: { value } }) => {
        setOptionOwner(value)
    };
    const handleOptionChangeSuit = ({ target: { value } }) => {
        setOptionSuit(value)
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
    const sendFrom = async () => {
        const res = await fetch('http://localhost:1337/api/horses?order=&filter=', {
            method: "POST",
            body: JSON.stringify({
                owner
            })
        });
        if (res.ok) {
            const data = await res.json()
            setHorses(data);
            setIsSorted(true);
        }
    }

    return (
        <div className={ah.window}>
            <div className={ah.main}>
                <header>
                    Добавление новой лошади
                </header>
                <main>
                    <form action='http://localhost:1337/api/horses' method='POST'>
                        <label for="owner">Владелец</label>
                        <select className={m.date} id='owner' name='owner' value={optionOwner} onChange={handleOptionChangeOwner}>
                            {owners.map(h => <option key={h.owner_id} value={h.owner_id}>{h.owner_name}</option>)}
                        </select>

                        <label for="horse">Кличка лошади</label>
                        <input type='text' id='horse' name='horse' value={'Кличка лошади'} minLength={"2"} required />

                        <label for="suit">масть лошади</label>
                        <select className={m.date} id='suit' name='suit' value={optionSuit} onChange={handleOptionChangeSuit}>
                            {horses.map(h => <option key={h.horse_id} value={h.suit}>{h.suit}</option>)}
                        </select>

                        <label for="age">Возраст лошади</label>
                        <input id='age' name='age' type='number' required />

                        <input type='button' onClick={}/>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Add