import { useState } from 'react';
import t from './tabs.module.css'
import Races from '../races/races';
import Horses from '../horses/horses';
import Jockeys from '../jockeys/jockeys';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("races")
    /*const handleRaces = () => {
        setActiveTab("races");
    };
    const handleHorses = () => {
        setActiveTab("horses");
    };
    const handleJockeys = () => {
        setActiveTab("jockeys");
    };*/
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    const styles = {
        active: {
            backgroundColor: "#B19580",
        }
    }

    return (
        <div>
            <ul className={t.tabs}>
                <div className={`${t.option} ${activeTab === "races" ? t.active : ""}`} onClick={() => handleTabClick("races")}>
                    <li //className={activeTab === "races" ? "active" : ""}
                        //onClick={handleRaces}
                        style={{ listStyle: "none", cursor: 'pointer' }}>Заезды</li>
                </div>
                <div className={`${t.option} ${activeTab === "horses" ? t.active : ""}`}
                    onClick={() => handleTabClick("horses")}>
                    <li //className={activeTab === "horses" ? "active" : ""}
                        //onClick={handleHorses}
                        style={{ listStyle: "none", cursor: 'pointer' }}>Лошади</li>
                </div>
                <div className={`${t.option} ${activeTab === "jockeys" ? t.active : ""}`}
                    onClick={() => handleTabClick("jockeys")}>
                    <li //className={activeTab === "jockeys" ? "active" : ""}
                        //onClick={handleJockeys}
                        style={{ listStyle: "none", cursor: 'pointer' }}>Жокеи</li>
                </div>
            </ul>
            <div className={t.outlet}>
                {activeTab === "races" ? <Races /> : activeTab === "horses" ? <Horses /> : <Jockeys />}

            </div>
        </div>
    )
}

export default Tabs