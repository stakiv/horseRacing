import { useEffect, useState } from 'react';
import j from './jockeys.module.css';
import Add from '../forms/add_form';
import Delete from '../forms/delete_form';

const Main = () => {

    const [jockeys, setJockeys] = useState([]);
    const [isSorted, setIsSorted] = useState([]);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    useEffect(() => {
        const fetchJockeys = async () => {
            const res = await fetch('http://localhost:1337/api/jockeys?order=&filter=', {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                setJockeys(data);
            }
        };
        fetchJockeys();
    }, []);
    const sortedJockeysWins = async () => {
        const res = await fetch('http://localhost:1337/api/jockeys?order=desc&filter=', {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            setJockeys(data);
            setIsSorted(true);
        }
    }
    const sortedJockeysAlph = async () => {
        const res = await fetch('http://localhost:1337/api/jockeys?order=&filter=', {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            setJockeys(data);
            setIsSorted(true);
        }
    }
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    }
    
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    }

    const addNewJockey = () => {
        setIsModalOpen1(true);
    }
    const deleteJockey = () => {
        setIsModalOpen2(true);
    }
    return (
        <main className={j.main}>
        <div className={j.buttons}>
                <div className={j.add}>
                    <input type='button' name={"add"} value={""} className={j.add_button} onClick={addNewJockey} />
                </div>
                <div className={j.add}>
                    <input type='button' name={"delete"} value={""} className={j.delete_button} onClick={deleteJockey} />
                </div>
            </div>
            <Add isOpen={isModalOpen1} onCancel={handleCancel1} nameType="jockey"/>
            <Delete isOpen={isModalOpen2} onCancel={handleCancel2} nameType="jockey"/>
            <div className={j.sort}>
                Сортировать по
                <div className={j.option}>
                    <input type='button' value={"Количество побед"} className={j.date} onClick={sortedJockeysWins}/>
                </div>
                <div className={j.option}>
                    <input type='button' value={"Алфавит"} className={j.date} onClick={sortedJockeysAlph}/>
                </div>
            </div>
            <div className={j.items}>
                <table className={j.item}>

                    <tr className={j.row}>
                        <th className={j.data}>№</th>
                        <th className={j.data}>ID</th>
                        <th className={j.data}>ФИО</th>
                        <th className={j.data}>Возраст</th>
                        <th className={j.data}>Кол-во побед</th>
                    </tr>

                    {jockeys.map((i, index) =>
                        <tr className={j.row}>
                            <td className={j.data}>{index+1}</td>
                            <td className={j.data}>{i['jockey_id']}</td>
                            <td className={j.data}>{i['jockey_name']}</td>
                            <td className={j.data}>{i['jockey_age']}</td>
                            <td className={j.data}>{i['wins']}</td>
                        </tr>

                    )}

                </table>
            </div>

        </main>
    )
}

export default Main