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
        jockey: "Альбус Дамблдор",
        time: "12:45"
    }
]

const race = () => {
    return (
        <div className={r.main}>
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
                    {}

                </main>
            </div>
        </div>
    )
}

export default race