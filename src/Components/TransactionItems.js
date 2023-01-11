

export const TransactionItems = ( props ) =>
{
    const { transactionDetails } = props
    const { search, amount, type, image, date } = transactionDetails
    console.log( { search, amount, type, image, date }, 'transactiondetails' )



    return (
        <li className='li-container'>
            <div className='details-container'>
                <div className='image-div'>
                    <p className='image'>{ image }</p>
                </div>
                <div className='para-container'>
                    <p className='userName'>{ search }</p>
                    <p className="date">{ date }</p>
                </div>

                <div className={ type === 'Income' ? "color-green" : "color-red" } >
                    <p className='para'>{ amount }</p>
                </div>


            </div>

        </li>
    )
}
