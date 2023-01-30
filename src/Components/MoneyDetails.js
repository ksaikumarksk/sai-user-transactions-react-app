import React, { useEffect, useState } from 'react'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { FaDollarSign } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";

export const MoneyDetails = ( props ) =>
{

    const { balanceAmount, expensesAmount } = props
    const [ parcentage, setParcentage ] = useState( 0 );
    const [ exParcentage, setExParcentage ] = useState( 0 );

    useEffect( () =>
    {
        const per = ( ( balanceAmount ) / 1000 ) * 100;
        setParcentage( per );
    }, [ balanceAmount ] )

    useEffect( () =>
    {

        const per = ( ( expensesAmount ) / 1000 ) * 100;
        setExParcentage( per );
    }, [ expensesAmount ] )
    return (
        <div className='money-details-container'>
            <div className='balance-container'>
                <div className='doller-container'>

                    <FaDollarSign className='icon' />

                </div>
                <h3 className="details-text">Income</h3>
                <h2 className="details-money" data-testid="balanceAmount">
                    $ { balanceAmount }
                </h2>
                <div className='arrow-icon'>
                    <AiOutlineArrowUp className='icon-para' />
                    <h4 className='icon-para'>{ Math.round( parcentage ) }%</h4>
                </div>
            </div>

            <div className="expenses-container">
                <div className='next-page'>
                    <CiShare1 className='icon1' />
                </div>
                <div className='md-containar'>
                    <h3 className="details-text">Expenses</h3>
                    <h2 className="details-money" data-testid="expensesAmount">
                        $ { expensesAmount }
                    </h2>
                    <div className='arrow-icon'>
                        <AiOutlineArrowDown className='icon-para1' />
                        <h4 className='icon-para1'>{ Math.round( exParcentage ) }%</h4>

                    </div>
                </div>
            </div>
        </div>
    )
}
