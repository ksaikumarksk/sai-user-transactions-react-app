export const DetailsUser = ( props ) =>
{
    const { details } = props
    const { userName, image, date } = details
    return (
        <li>
            <div className='li-container'>
                <div className='details-container'>

                    <div className='image-div'>
                        <img src={ image } className='image' alt="profile" />
                    </div>
                    <div className='para-container'>
                        <p className='t-user'>{ userName } </p>
                        <h6 className='t-date'>{ date }</h6>
                    </div>
                </div>
            </div>

        </li>
    )
}
