import r from './race_item.module.css'
const ite = [
    {
        number: 1,
        horse: "star",
        jockey: "Регулус Блэк",
        time: "12:23"
    },
    {
        number: 2,
        horse: "moon",
        jockey: "Альбус Альбус АульбусДамблдор",
        time: "12:45"
    }
]

const race = (props) => {
    const num = props.num;
    return (
        <div className={r.main}>

            <table className={r.item}>
                
                <header className={r.item_header}>
                    Заезд № {num}
                </header>
                <tr className={r.row}>
                    <th className={r.data}>№</th>
                    <th className={r.data}>Лошадь</th>
                    <th className={r.data}>Жокей</th>
                    <th className={r.data}>Время</th>
                </tr>

                {ite.map(i =>
                    <tr className={r.row}>
                        <td className={r.data}>{i.number}</td>
                        <td className={r.data}>{i.horse}</td>
                        <td className={r.data}>{i.jockey}</td>
                        <td className={r.data}>{i.time}</td>
                    </tr>

                )}
            </table>
            {/* 
            <div className={r.item}>

                <header className={r.item_header}>
                    Заезд №
                </header>
                <main>

                    <div className={r.header}>
                        <div>№</div>
                        <div>Лошадь</div>
                        <div>Жокей</div>
                        <div>Время</div>
                    </div>
                    {ite.map(i =>
                        <div className={r.header}>
                            <div>{i.number}</div>
                            <div>{i.horse}</div>
                            <div>{i.jockey}</div>
                            <div>{i.time}</div>
                        </div>

                    )}

                </main>
            </div>
                */}
        </div>
    )
}

export default race