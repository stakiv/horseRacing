import Races from './races/races'
import Ippodrom from './main_el/ippodrom'
import Tabs from './main_el/tabs'
import m from './main.module.css'

const main = () => {
    return (
        <div className={m.main}>
            <Ippodrom />
            <Tabs />
            
        </div>
    )
}

export default main