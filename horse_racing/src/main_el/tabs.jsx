import { useState } from 'react';
import t from './tabs.module.css'
import Races from '../races/races';
import Horses from '../horses/horses';
import Jockeys from '../jockeys/jockeys';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("races")
    const handleRaces = () => {
        setActiveTab("races");
    };
    const handleHorses = () => {
        setActiveTab("horses");
    };
    const handleJockeys = () => {
        setActiveTab("jockeys");
    };
    const styles = {
        list: {
            listStyle: "none",
            marginLeft: "0",
            paddingLeft: "0"
        }
    }

    return (
        <div>
            <ul className={t.tabs}>
                <li className={activeTab === "races" ? "active" : ""}
                    onClick={handleRaces}
                    style={{listStyle: "none", cursor: 'pointer'}}>Заезды</li>
                <li className={activeTab === "horses" ? "active" : ""}
                    onClick={handleHorses}
                    style={{listStyle: "none", cursor: 'pointer'}}>Лошади</li>
                <li className={activeTab === "jockeys" ? "active" : ""}
                    onClick={handleJockeys}
                    style={{listStyle: "none", cursor: 'pointer'}}>Жокеи</li>
            </ul>
            <div className={t.outlet}>
                {activeTab === "races" ? <Races /> : activeTab === "horses" ? <Horses /> : <Jockeys />}

            </div>
        </div>
    )
}

export default Tabs