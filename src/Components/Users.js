import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { DetailsUser } from './DetailsUser'
import { MoneyDetails } from './MoneyDetails'
import { TransactionItems } from './TransactionItems'

const getDataFromLs = () =>
{
    const data1 = localStorage.getItem( 'userDetails' )
    console.log( 'data: ', JSON.parse( data1 ) )
    if ( data1 )
    {
        // console.log( data, 'data out' )
        return JSON.parse( data1 );
    }
    else
    {
        return []
    }
}

const imageList = [
    {
        id: 0,
        imageUrl: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
    },
    {
        id: 1,
        imageUrl: 'https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg'
    },
    {
        id: 2,
        imageUrl: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg'
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
    },
    {
        id: 4,
        imageUrl: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg'
    },
    {
        id: 5,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR63KoribGVDB_dswx8iUX99udIebJK_EsaYYTwg2vJoIeIECXhO8iWnI5VBU64wLJ-8gg&usqp=CAU'
    },
    {
        id: 6,
        imageUrl: 'https://t3.ftcdn.net/jpg/02/36/48/86/360_F_236488644_opXVvD367vGJTM2I7xTlsHB58DVbmtxR.jpg'
    },
    {
        id: 7,
        imageUrl: 'https://us.123rf.com/450wm/lacheev/lacheev2109/lacheev210900016/lacheev210900016.jpg?ver=6'
    },
    {
        id: 8,
        imageUrl: 'https://media.istockphoto.com/id/1249890789/photo/studio-shot-of-a-young-man-looking-sideways.jpg?s=612x612&w=0&k=20&c=bizUOZ7pZcul46yzEoEp5R7934Z-x0BY5FcviXoyXoI='
    },
    {
        id: 9,
        imageUrl: 'https://media.istockphoto.com/id/899699408/photo/portrait-of-handsome-bearded-man-with-blue-eyes-against-white-background.jpg?s=612x612&w=0&k=20&c=TqN9Lf-RjY3Y8jvCtzwRu8iXI-cUzxxAzXWvppSFC0E='
    },

]

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
        image: Math.floor( Math.random() * imageList.length ),
        // image: imageList[ 0 ].id,
        date: new Date().toString().split( 'G' )[ 0 ],


    } )




    const [ transaction, setTransaction ] = useState( {
        tranList: [],
        userName: lists[ 0 ].userName,
        image: lists[ 0 ].image,
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


        const displayText = typeOption.displayText;

        const userNameId = lists.find( eachUser => eachUser.userName === transaction.userName );
        const imageId = userNameId.image;
        console.log( "imageId: ", imageId )

        const { userName } = userNameId;

        // const imageId = lists.find( eachUser =>
        // {
        //     console.log( "eachUser Image: ", eachUser.image )
        //     console.log( "transaction image: ", transaction.image )
        //     return (
        //         eachUser.image === transaction.image
        //     )

        // } )

        const image = imageId

        const newTransaction = {
            id: v4(),
            userName: userName,
            amount: parseInt( transaction.amount ),
            image: image,
            date: transaction.date,
            type: displayText,

        }



        setTransaction( prevState =>
        {
            return {
                tranList: [ ...prevState.tranList, newTransaction ],
                userName: lists[ 0 ].userName,
                image: lists[ 0 ].image,
                date: new Date().toString().split( 'G' )[ 0 ],
                amount: '',
                optionId: transactionTypeOptions[ 0 ].optionId
            }
        } )
        setTrOpen( false )

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


    const getBalance = () =>
    {
        let balanceAmount = 0
        let incomeAmount = 0
        let expensesAmount = 0

        transaction.tranList && transaction.tranList.forEach( eachTransaction =>
        {
            if ( eachTransaction.type === transactionTypeOptions[ 0 ].displayText )
            {
                incomeAmount += eachTransaction.amount
            } else
            {
                expensesAmount -= eachTransaction.amount
            }
        } )

        balanceAmount = incomeAmount + expensesAmount

        return balanceAmount
    }



    // const searchResult = lists?.filter( eachUser =>
    //     eachUser.userName?.toLowerCase().includes( search.toLowerCase() ),
    // )



    //images id


    const addSubmit = ( e ) =>
    {
        e.preventDefault()
        const imagesUrl = imageList[ data.image ]

        const newList = {
            id: v4(),
            userName: data.userName,
            image: imagesUrl.imageUrl,
            date: data.date

        }
        const newUsers = [ ...lists, newList ]

        setData( prevState => ( {

            userName: '',

            date: new Date().toString().split( 'G' )[ 0 ]
        } ) )
        setLists( newUsers )

        setOpen( false )
    }

    //change  image
    // const changeImage = () =>
    // {
    //     const randomImage = '';
    //     setData( data.image( randomImage ) )
    // }

    // useEffect( () => changeImage(), [] )






    // const lists = data.list


    useEffect( () =>
    {

        localStorage.setItem( 'userDetails', JSON.stringify( lists ) )
    }, [ lists ] )

    const usersOpen = ( e ) =>
    {
        setOpen( true )
        setTrOpen( false )
    }

    const transactionOpen = ( e ) =>
    {
        setTrOpen( true )

    }
    //options id
    const options = transaction.tranList

    return (
        <div className='main'>

            <div className='container'>
                <div className='btn-container'>
                    <div className='ut-contaimer'>
                        <button className='open-btn' onClick={ usersOpen }>users</button>
                        <button className='open-btn' onClick={ transactionOpen }>Transactions</button>
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



                            <form onSubmit={ AddOnTransaction }>
                                <select id='select' className='input-2' value={ transaction.userName } onChange={ e => setTransaction( ( prevState ) => { return { ...prevState, userName: e.target.value } } ) } >

                                    { lists.map( eachUser => (
                                        <option key={ eachUser.userName } value={ eachUser.userName }>
                                            { eachUser.userName }

                                        </option>
                                    ) ) }
                                </select>
                                <input type="text" className='input1' vlaue={ transaction.amount } placeholder='enter amount' onChange={ e => setTransaction( ( prevState ) => { return { ...prevState, amount: e.target.value } } ) } />
                                <select id="select" className='input-2' value={ transaction.optionId } onChange={ e => setTransaction( ( prevState ) => { return { ...prevState, optionId: e.target.value } } ) }>
                                    { transactionTypeOptions.map( eachOption => (
                                        <option key={ eachOption.optionId } value={ eachOption.optionId }>
                                            { eachOption.displayText }
                                        </option>
                                    ) ) }
                                </select>
                                <button type="submit" className='submit-btn'>Add</button>
                            </form>

                        </div> ) : ( null ) }

                    <div className=' money-details'>

                        <MoneyDetails
                            balanceAmount={ getBalance() }

                            expensesAmount={ getExpenses() } />
                    </div>

                </div>

                <div className='transaction-container'>
                    <div className='ui-transaction'>
                        <div className='transaction-head'>
                            <h1 className='tr-head'>Transactions</h1>
                            <a href='view all' className='a-element'>View All</a>
                        </div>
                        <ul className='ul'>

                            { options.map( eachTransaction => (
                                <TransactionItems key={ eachTransaction.userName } transactionDetails={ eachTransaction } />
                            ) ) }

                        </ul>

                    </div>
                </div>
                <div className='transaction-container'>
                    <div className='ul-users' >
                        <ul className='ul'>
                            <h1 className='user-head'>users</h1>
                            { lists && lists.map( user => ( <DetailsUser key={ user.id } details={ user } /> ) ) }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users