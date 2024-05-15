import j from './horses.module.css'

const horses = [
    {
        id: 0,
        name: "Star",
        suit: "Соловая",
        age: 3,
        owner: "Куликова Мария",
        wins: 8,
    },
    {
        id: 1,
        name: "Moon",
        suit: "Буланая",
        age: 4,
        owner: "Леонов Кирилл",
        wins: 2,
    }

]

const Main = () => {
    return (
        <main className={j.main}>
            <div className={j.sort}>
                Сортировать по
                <div className={j.option}>
                    <input type='button' value={"Количество побед"}  className={j.date}/>
                </div>
            </div>
            <div className={j.items}>
                <table className={j.item}>

                    <tr className={j.row}>
                        <th className={j.data}>ID</th>
                        <th className={j.data}>Кличка</th>
                        <th className={j.data}>Масть</th>
                        <th className={j.data}>Возраст</th>
                        <th className={j.data}>Владелец</th>
                        <th className={j.data}>Кол-во побед</th>
                    </tr>
                    
                        {horses.map(i =>
                            <tr className={j.row}>
                                <td className={j.data}>{i.id}</td>
                                <td className={j.data}>{i.name}</td>
                                <td className={j.data}>{i.suit}</td>
                                <td className={j.data}>{i.age}</td>
                                <td className={j.data}>{i.owner}</td>
                                <td className={j.data}>{i.wins}</td>
                            </tr>

                        )}
                    
                </table>
            </div>
            <div className={j.items}>
                <table className={j.item}>

                    <tr className={j.row}>
                        <th className={j.data}>ID</th>
                        <th className={j.data}>Кличка</th>
                        <th className={j.data}>Масть</th>
                        <th className={j.data}>Возраст</th>
                        <th className={j.data}>Владелец</th>
                        <th className={j.data}>Кол-во побед</th>
                    </tr>
                    
                        {horses.map(i =>
                            <tr className={j.row}>
                                <td className={j.data}>{i.id}</td>
                                <td className={j.data}>{i.name}</td>
                                <td className={j.data}>{i.suit}</td>
                                <td className={j.data}>{i.age}</td>
                                <td className={j.data}>{i.owner}</td>
                                <td className={j.data}>{i.wins}</td>
                            </tr>

                        )}
                    
                </table>
            </div>
            <div className={j.items}>
                <table className={j.item}>

                    <tr className={j.row}>
                        <th className={j.data}>ID</th>
                        <th className={j.data}>Кличка</th>
                        <th className={j.data}>Масть</th>
                        <th className={j.data}>Возраст</th>
                        <th className={j.data}>Владелец</th>
                        <th className={j.data}>Кол-во побед</th>
                    </tr>
                    
                        {horses.map(i =>
                            <tr className={j.row}>
                                <td className={j.data}>{i.id}</td>
                                <td className={j.data}>{i.name}</td>
                                <td className={j.data}>{i.suit}</td>
                                <td className={j.data}>{i.age}</td>
                                <td className={j.data}>{i.owner}</td>
                                <td className={j.data}>{i.wins}</td>
                            </tr>

                        )}
                    
                </table>
            </div>

        </main>
    )
}

export default Main