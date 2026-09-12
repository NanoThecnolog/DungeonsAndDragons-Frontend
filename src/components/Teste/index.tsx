import { useState } from "react"

export default function Teste() {

    const [a, setA] = useState<number>()
    const [b, setB] = useState<number>()
    const [resultado, setResultado] = useState("Esse é o número convertido em string: ")
    const [visible, setVisible] = useState(false)

    function soma() {
        setResultado(resultado + a.toString())
        setVisible(true)
    }


    return (
        <div>
            <h3>Primeiro Número</h3>
            <input type="number" placeholder="Primeiro Número" onChange={(e) => setA(Number(e.target.value))} />
            <button type="button" onClick={soma}>executar conversão em string</button>
            {visible && (
                <>
                    <h2>Resultado:</h2>
                    <p>{resultado}</p>
                </>
            )}

        </div>
    )
}