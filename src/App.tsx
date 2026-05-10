import { useState } from "react";
import Pet from './Pet'
import logo from './assets/logo.png'
import { useEffect } from "react";
function App() {
    const [state, setState] = useState('idle 3s infinite step-start')
    const [page, setPage] = useState('default')
    const [happy, setHappy] = useState(4)
    const [hunger, setHunger] = useState(4)
    const [age, setAge] = useState(4)
    const [weight, setWeight] = useState(5)

    useEffect(() => {
        const id = setInterval(() => {
            setHappy(happy - 1);
            setHunger(hunger - 1);
            setAge(age + 1);
        }, 300000);
        return () => clearInterval(id)
    }, [])

    return (
        <div className='tamagotchi'>
            <img src={logo} width={150} height={50} />
            <div className='screen'>
                {page === 'default' ?
                    <Pet curAnimation={state} />
                    : page === 'game' ?
                        <>
                            <h1>Game</h1>
                        </>
                        : page === 'stats' ?
                            <div style={{ fontSize: "small" }}>
                                <h5>Age: {age}</h5>
                                <h5>Weight: {weight}</h5>
                                <h5>Happy: {happy}</h5>
                                <h5>Hunger: {hunger}</h5>
                            </div>
                            : null}
            </div>

            <div className="btn-group">
                <button className="btn" onClick={() => setPage('default')}>Feed</button>
                <button className="btn" onClick={() => setPage('game')}>Play</button>
                <button className="btn" onClick={() => setPage('stats')}>Stats</button>
            </div>
        </div>
    );
}

export default App;