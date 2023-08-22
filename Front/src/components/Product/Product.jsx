export const Product = ({name, price, stock})=>{ //PROPS -> parámetros que se envían al momento de llamar al componente (la función)
    return (
        <>
            <td>{name}</td>
            <td>{price}</td>
            <td>{stock}</td>
]
        </>
    )
}