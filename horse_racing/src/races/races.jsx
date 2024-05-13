import m from './races.module.css'
import Race from './race_item'

const horses = [
    "Star", "Moon", "Nana", "Winner"
]
const jockeys = [
    "Рябова Елизавета", "Леонова Екатерина", "Рябова Екатерина", "Екатерина Рябова"
]

const main = () => {
    return (

        <main className={m.main}>

            <div className={m.filters}>
                <div className={m.option}><div>Дата</div>
                    <input type='date' className={m.date} /></div>

                <div className={m.option}>
                    <div>Лошадь</div>
                    <select className={m.date}>
                        <option value="All">Все</option>
                        {horses.map(h => <option value={h}>{h}</option>)}
                    </select>
                </div>

                <div className={m.option}>
                    <div>Жокей</div>
                    <select className={m.date}>
                        <option value="All">Все</option>
                        {jockeys.map(h => <option value={h}>{h}</option>)}
                    </select>
                </div>
            </div>
            <div className={m.items}>
                <Race />
                <Race />
                <Race />
                <Race />
            </div>
        </main>
    )
}

export default main