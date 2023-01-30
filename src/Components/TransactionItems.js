

export const TransactionItems = ( props ) =>
{
    const { transactionDetails } = props
    const { amount, type, image, date, username } = transactionDetails







    return (
        <li className='li-container'>
            <div className='transation-container'>
                <div className='d-c'>
                    <div className='image-div'>
                        <img src={ image } className="image" alt='profile' />
                    </div>
                    <div className='para-container'>
                        <p className='t-user'>{ username } </p>
                        <p className="t-date">{ date }</p>
                    </div>
                </div>
                <div className={ type === 'Income' ? "color-green" : "color-red" } >
                    <p className='para'>${ amount }</p>
                </div>
            </div>

        </li>
    )
}
