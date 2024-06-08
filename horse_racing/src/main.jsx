import Races from './races/races'
import Ippodrom from './main_el/ippodrom'
import Tabs from './main_el/tabs'
import m from './main.module.css'

const main = () => {
    return (
        <div className={m.all}>
            <div className={m.main}>
                <Tabs />
            </div>


        </div>
    )
}

export default main