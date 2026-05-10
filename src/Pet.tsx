import petImg from './assets/pet.png'

export default function Pet({ curAnimation }: { curAnimation: string }) {
    return (
        <div className="pet" style={{ animation: curAnimation }}>
            <img src={petImg}/>
        </div>
    )
}
