import t from './tabs.module.css'

const tabs = () => {
    return (
        <div className={t.tabs}>
            <input type="button" value="Заезды" className={t.option} />
            <input type="button" value="Лошади"className={t.option}/>
            <input type="button" value="Жокеи"className={t.option}/>
        </div>
    )
}

export default tabs