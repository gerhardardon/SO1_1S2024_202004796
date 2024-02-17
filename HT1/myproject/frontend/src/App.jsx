import {useEffect, useState}from 'react';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import {Extraer} from "../wailsjs/go/main/App";
import CreateDoughnutData from './data';

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e) => setName(e.target.value);
    const updateResultText = (result) => {
        setResultText(result)
        console.log(result);
    };

    const [free, setFree] = useState(0);
    const [used, setUsed] = useState(0);

    const update = (info) => {
        const inf = info.split("  ")

        setFree(inf[0]);
        setUsed(inf[1]-inf[0]);

        console.log("Info: ", info);
        console.log("Free: ", free);
        console.log("Used: ", used);

        CreateDoughnutData.arguments.data.datasets[0].data = [free, used];
    };


    const extraerDatos = () => {
        console.log("Extraer datos");
        Extraer().then(update);
    };
    useEffect(() => {
        const time = setInterval(extraerDatos, 3000); //ejecuta la func cada 3s
        return () => clearInterval(time);
    }, []); // El segundo argumento de useEffect es una lista de dependencias, en este caso, está vacío
    

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <div id="App">
            <h1 id="title" className="title">Hola usuario! esta es tu RAM:</h1>
            <CreateDoughnutData free={free} used={used}/>
            <h3 id="result" className="result">{"Free kb:    "+free}</h3>
            <h3 id="result" className="result">{"Used kb:    "+used}</h3>
        </div>
    )
}

export default App
