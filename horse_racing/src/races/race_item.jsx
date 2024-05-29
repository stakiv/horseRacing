import r from './race_item.module.css'

const race = (props) => {
    const id = props.race_id;
    const race = props.race_name;
    const horses = props.horse_name;
    const jockey = props.jockey_name;
    const time = props.time;

    return (
        <div className={r.main}>

            <table className={r.item}>
                
                <header className={r.item_header}>
                    Заезд № {id} "{race}"
                </header>
                <tr className={r.row}>
                    <th className={r.data}>№</th>
                    <th className={r.data}>Лошадь</th>
                    <th className={r.data}>Жокей</th>
                    <th className={r.data}>Время</th>
                </tr>

                {horses.map(i =>
                    <tr className={r.row}>
                        <td className={r.data}>{i}</td>
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