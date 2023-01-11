import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { DetailsUser } from './DetailsUser'
import { MoneyDetails } from './MoneyDetails'
import { TransactionItems } from './TransactionItems'

const getDataFromLs = () =>
{
    const data = localStorage.getItem( 'userDetails' )
    console.log( data, 'data' )
    if ( data )
    {
        console.log( data, 'data out' )
        return JSON.parse( data );
    }
    else
    {
        return []
    }
}

const Users = () =>
{
    const [ open, setOpen ] = useState( false )
    const [ trOpen, setTrOpen ] = useState( false )
    const [ lists, setLists ] = useState( getDataFromLs() )

    const transactionTypeOptions = [
        {
            optionId: 'INCOME',
            displayText: 'Income',
        },
        {
            optionId: 'EXPENSES',
            displayText: 'Expenses',
        },
    ]
    const [ data, setData ] = useState( {

        userName: '',
        image: 's',
        date: new Date().toString().split( 'G' )[ 0 ],


    } )

    const [ search, setSearch ] = useState( '' )

    const [ transaction, setTransaction ] = useState( {
        tranList: [],
        image: 's',
        date: new Date().toString().split( 'G' )[ 0 ],
        amount: '',
        optionId: transactionTypeOptions[ 0 ].optionId,
    } )

    const AddOnTransaction = ( e ) =>
    {
        e.preventDefault()
        const typeOption = transactionTypeOptions.find(
            eachTransaction => eachTransaction.optionId === transaction.optionId,
        )
        console.log( { typeOption } );

        const { displayText } = typeOption

        console.log( { displayText } )

        const newTransaction = {
            id: v4(),
            search: search,
            amount: parseInt( transaction.amount ),
            image: transaction.image,
            date: transaction.date,
            type: displayText,

        }

        setTransaction( prevState => ( {
            tranList: [ ...prevState.tranList, newTransaction ],

            amount: '',
            optionId: transactionTypeOptions[ 0 ].optionId
        } ) )
        setSearch( '' )
    }

    const getExpenses = () =>
    {
        let expensesAmount = 0

        transaction.tranList.forEach( eachTransaction =>
        {
            if ( eachTransaction.type === transactionTypeOptions[ 1 ].displayText )
            {
                expensesAmount += eachTransaction.amount
            }

        } )
        return expensesAmount
    }

    const getIncome = () =>
    {
        let incomeAmount = 0

        transaction.tranList.forEach( eachTransaction =>
        {
            if ( eachTransaction.type === transactionTypeOptions[ 0 ].displayText )
            {
                incomeAmount += eachTransaction.amount
            }
        } )

        return incomeAmount
    }

    const getBalance = () =>
    {
        let balanceAmount = 0
        let incomeAmount = 0
        let expensesAmount = 0

        transaction.tranList.forEach( eachTransaction =>
        {
            if ( eachTransaction.type === transactionTypeOptions[ 0 ].displayText )
            {
                incomeAmount += eachTransaction.amount
            } else
            {
                expensesAmount += eachTransaction.amount
            }
        } )

        balanceAmount = incomeAmount + expensesAmount

        return balanceAmount
    }
    // const SearchUserName = ( e ) =>
    // {
    //  setSearch(e.target.value)
    // }

    const searchResult = lists?.filter( eachUser =>
        eachUser.userName?.toLowerCase().includes( search.toLowerCase() ),
    )

    console.log( "search avalue", searchResult )


    const addSubmit = ( e ) =>
    {
        e.preventDefault()
        const newList = {
            id: v4(),
            userName: data.userName,
            image: data.image,
            date: data.date

        }
        const newUsers = [ ...lists, newList ]
        setData( prevState => ( {

            userName: '',
            image: 's',
            date: new Date().toString().split( 'G' )[ 0 ]
        } ) )
        setLists( newUsers )
    }

    // const lists = data.list

    console.log( "list of data:", lists )

    useEffect( () =>
    {

        localStorage.setItem( 'userDetails', JSON.stringify( lists ) )
    }, [ lists ] )



    return (
        <div className='container'>
            <div className='btn-container'>
                <button className='open-btn' onClick={ e => setOpen( true ) }>users</button>
                <button className='open-btn' onClick={ e => setTrOpen( true ) }>Transactions</button>
            </div>
            { open ? ( <form onSubmit={ addSubmit }>
                <div className='input-container'>

                    {/* <label htmlFor="username">userName</label> */ }
                    <input className='input' type="text" placeholder="userName" id='username' value={ data.userName } onChange={ e => setData( ( prevState ) => { return { ...prevState, userName: e.target.value } } ) } />
                    <button className='submit-btn' type="submit">Add User</button>
                </div>
            </form> ) : ( null ) }
            { trOpen ? (
                <div className='tran-container'>
                    <MoneyDetails
                        balanceAmount={ getBalance() }
                        incomeAmount={ getIncome() }
                        expensesAmount={ getExpenses() } />


                    <form onSubmit={ AddOnTransaction }>
                        <input type='search' className='input' value={ search } placeholder="search userName" onChange={ e => setSearch( e.target.value ) } />
                        <input type="text" className='input1' vlaue={ transaction.amount } placeholder='enter amount' onChange={ e => setTransaction( ( prevState ) => { return { ...prevState, amount: e.target.value } } ) } />
                        <select id="select" className='input' value={ transaction.optionId } onChange={ e => setTransaction( ( prevState ) => { return { ...prevState, optionId: e.target.value } } ) }>
                            { transactionTypeOptions.map( eachOption => (
                                <option key={ eachOption.optionId } value={ eachOption.optionId }>
                                    { eachOption.displayText }
                                </option>
                            ) ) }
                        </select>
                        <button type="submit" className='subnmit-btn'>Add</button>
                    </form>

                </div> ) : ( null ) }


            <div className='ui-transaction'>

                <ul className='ul'>
                    <h1 className='ui-head'>Transaction</h1>
                    { transaction.tranList.map( eachTransaction => (
                        <TransactionItems key={ eachTransaction.id } transactionDetails={ eachTransaction } />
                    ) ) }

                </ul>
            </div>
            <div>
                <ul className='ul'>
                    <h1 className='user-head'>users</h1>
                    { searchResult && searchResult.map( user => ( <DetailsUser key={ user.id } details={ user } /> ) ) }
                </ul>
            </div>
        </div>
    )
}

export default Users