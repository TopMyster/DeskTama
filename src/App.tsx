import { useState, useEffect } from "react";
import Pet from './Pet'
import logo from './assets/logo.png'
import death from './assets/death.png'

function App() {
    const [state, setState] = useState('idle 5s infinite step-start')
    const [page, setPage] = useState('default')
    const [happy, setHappy] = useState(4)
    const [hunger, setHunger] = useState(4)
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(5)

    useEffect(() => {
        const id = setInterval(() => {
            if ((hunger < 3 || happy < 3) && page !== 'dead') {
                const audio = new Audio('/src/assets/audio/beep.mp3');
                audio.play()
            }
        }, 10000);
        return () => clearInterval(id);
    }, [hunger, happy, page]);

    const triggerAnimation = (type: 'happy' | 'sad') => {
        setState(`${type} 1s infinite step-start`);
        setTimeout(() => {
            setState('idle 5s infinite step-start');
        }, 3000);
    };

    const feed = () => {
        if (hunger < 6) {
            setHunger(prev => prev + 1);
            setPage('default');
            triggerAnimation('happy');
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            setHappy(prev => Math.max(0, prev - 1));
            setHunger(prev => Math.max(0, prev - 1));

            if (hunger >= 3 && happy >= 3) {
                setAge(prev => prev + 0.5);
                setWeight(prev => prev + 0.5);
            }
        }, 1800000);

        return () => clearInterval(id);
    }, [hunger, happy])

    useEffect(() => {
        const id = setInterval(() => {
            if (hunger === 0 && happy === 0 && page !== 'dead') {
                setPage('dead');
            }
        }, 3600000);

        return () => clearInterval(id);
    }, [hunger, happy, page])

    const play = (selection: string) => {
        let i = Math.floor(Math.random() * 10) + 1;
        setPage('default');

        if (i < 6 && selection === 'greater') {
            setHappy(prev => Math.min(5, prev + 1));
            triggerAnimation('happy');
        } else if (i > 5 && selection === 'less') {
            setHappy(prev => Math.min(5, prev + 1));
            triggerAnimation('happy');
        } else {
            setHappy(prev => Math.max(0, prev - 1));
            triggerAnimation('sad');
        }
    };

    return (
        <div className='tamagotchi'>
            <img src={logo} width={150} height={50} style={{ marginBottom: '10px' }} />
            <div className='screen'>
                {page === 'default' ? (
                    <Pet curAnimation={state} />
                ) : page === 'game' ? (
                    <div style={{ padding: '10px', textAlign: 'center' }}>
                        <h4 style={{ margin: '0 0 10px 0' }}>Guess!</h4>
                        <div style={{ fontSize: '24px', marginTop: '10px' }}>?</div>
                    </div>
                ) : page === 'stats' ? (
                    <div style={{ fontSize: "12px", textAlign: 'left', padding: '10px' }}>
                        <div>Age: {age} yr</div>
                        <div>Weight: {weight}g</div>
                        <div>Happy: {'♡'.repeat(happy) || 'None'}</div>
                        <div>Hunger: {'♡'.repeat(hunger) || 'None'}</div>
                    </div>
                ) : page === 'dead' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <img src={death} width={80} height={50} />
                        <h5 style={{ marginTop: '10px', fontSize: "10px" }}>CMD + R to Restart</h5>
                    </div>
                ) : null}
            </div>

            <div className="btn-group">
                <button
                    className="btn"
                    onClick={page !== 'game' ? () => feed() : () => play('less')}
                ></button>
                <button
                    className="btn"
                    onClick={page !== 'game' ? () => setPage('game') : () => setPage('default')}
                    style={{ marginTop: '8px' }}
                ></button>
                <button
                    className="btn"
                    onClick={page !== 'game' ? () => setPage('stats') : () => play('greater')}
                ></button>
            </div>
        </div>
    );
}

export default App;