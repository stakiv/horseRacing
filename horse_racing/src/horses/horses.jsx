import { useEffect, useState } from 'react';
import j from './horses.module.css'
import Add from './add_horse'
import Delete from './delete_horse'


const Main = () => {

    const [horses, setHorses] = useState([]);
    const [isSorted, setIsSorted] = useState([]);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    useEffect(() => {
        const fetchHorses = async () => {
            const res = await fetch('http://localhost:1337/api/horses?order=&filter=&owner=', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setHorses(data);
            }
        };
        fetchHorses();
    }, []);
    const sortedHorsesWins = async () => {
        const res = await fetch('http://localhost:1337/api/horses?order=desc&filter=&owner=', {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            setHorses(data);
            setIsSorted(true);
        }
    }
    const sortedHorsesAlph = async () => {
        const res = await fetch('http://localhost:1337/api/horses?order=&filter=&owner=', {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            setHorses(data);
            setIsSorted(true);
        }
    }
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    }
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    }

    const addNewHorse = () => {
        setIsModalOpen1(true);
    }
    const deleteHorse = () => {
        setIsModalOpen2(true);
    }
    return (
        <main className={j.main}>
            <div className={j.buttons}>
                <div className={j.add}>
                    <input type='button' name={"add"} value={""} className={j.add_button} onClick={addNewHorse} />
                </div>
                <div className={j.add}>
                    <input type='button' name={"delete"} value={""} className={j.delete_button} onClick={deleteHorse} />
                </div>
            </div>
            <Add isOpen={isModalOpen1} onCancel={handleCancel1} />
            <Delete isOpen={isModalOpen2} onCancel={handleCancel2} />
            <div className={j.sort}>
                Сортировать по
                <div className={j.option}>
                    <input type='button' name={"wins"} value={"Количество побед"} className={j.date} onClick={sortedHorsesWins} />
                </div>
                <div className={j.option}>
                    <input type='button' name={"alph"} value={"Алфавит"} className={j.date} onClick={sortedHorsesAlph} />
                </div>
            </div>
            <div className={j.items}>
                <div className={j.marg}>
                    <table className={j.item}>

                        <tr className={j.row}>
                            <th className={j.data}>№</th>
                            <th className={j.data}>ID</th>
                            <th className={j.data}>Кличка</th>
                            <th className={j.data}>Масть</th>
                            <th className={j.data}>Возраст</th>
                            <th className={j.data}>Владелец</th>
                            <th className={j.data}>Кол-во побед</th>
                        </tr>

                        {horses.map((i, index) =>
                            <tr className={j.row}>
                                <td className={j.data}>{index + 1}</td>
                                <td className={j.data}>{i['horse_id']}</td>
                                <td className={j.data}>{i['horse_name']}</td>
                                <td className={j.data}>{i['suit']}</td>
                                <td className={j.data}>{i['horse_age']}</td>
                                <td className={j.data}>{i['owner_name']}</td>
                                <td className={j.data}>{i['wins']}</td>
                            </tr>
                        )}

                    </table>
                </div>
            </div>

        </main>
    )
}

export default Main