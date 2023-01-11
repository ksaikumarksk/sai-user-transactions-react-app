export const DetailsUser = ( props ) =>
{
    console.log( "in details: ", { props } )
    const { details } = props
    const { userName, image, date } = details
    console.log( { userName, image, date } )
    return (
        <li>
            <div className='li-container'>
                <div className='details-container'>

                    <div className='image-div'>
                        <p className='image'>{ image }</p>
                    </div>
                    <div className='para-container'>
                        <p className='userName'>{ userName } </p>
                        <h6 className='date'>{ date }</h6>
                    </div>
                </div>
            </div>

        </li>
    )
}
