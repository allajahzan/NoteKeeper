interface headingData {
    className?: string,
    innerText: Date | string
}


function Heading1({ className, innerText }: headingData) {
    return (
        <>
            <h1 className={className}>{innerText as string}</h1>
        </>
    )
}

export default Heading1