import React from 'react'
import { observer } from 'mobx-react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button, Input } from 'semantic-ui-react'
import AppStore from './App.store.js'
import Post from './Post'
import Loading from './Loading'
import ConfirmationDialog from './ConfirmationDialog'
import ConfirmationDialogFixed from './ConfirmationDialogFixed'


const ADD_TODO = gql`
  mutation PutPost {
    putPost {
      id
      title
    }
  }
`


const ConfirmationButtons = observer(() => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-around'
    }}>
        <Button
            style={{width: '40%'}}
            disabled={AppStore.confirmation.disabled}
            primary
            onClick={() => {
                console.log('removed!')
                AppStore.closeConfirmation()
            }}>Confirm</Button>
        <Button
            secondary
            style={{width: '40%'}}
            onClick={AppStore.closeConfirmation}>Cancel</Button>
    </div>
))

@observer
export default class App extends React.Component {
    render() {

        return (
            <div>
                <h2>Posts</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr'
                }}>
                    {
                        [1, 2].map(n => (
                            <Post id={n} key={n}/>
                        ))
                    }
                </div>
                <hr/>
                <h2>Intercepting loaders</h2>
                <p>Loadings in progress: {AppStore.loading}</p>
                <Mutation mutation={ADD_TODO}>
                    {
                        putPost => (<Button primary onClick={putPost}>Mutation</Button>)
                    }
                </Mutation>
                <hr/>
                <h2>Dialogs</h2>
                <Button color='teal' onClick={() => {
                    const number = Math.floor(Math.random() * 1000)
                    AppStore.openConfirmation({
                        title: `Do you want to remove post #${number}?`,
                        description: `To remove the post, type ${number} in the below input`,
                        children: [
                            <Input placeholder={`Type ${number}`}
                                   value={AppStore.confirmation && AppStore.confirmation.inputValue}
                                   onChange={(e) => {
                                       AppStore.confirmation.inputValue = e.target.value
                                       AppStore.confirmation.disabled = e.target.value !== number.toString()
                                   }}
                            />,
                            <ConfirmationButtons />
                        ]
                    })
                }}>
                    Show dialog
                </Button>
                <Button color='teal' onClick={() => {
                    AppStore.openConfirmationFixed({
                        title: `Do you want to remove post?`,
                        description: `Sure`,
                        onSuccess: () => console.log('removed!')
                    })
                }}>
                    Show fixed dialog
                </Button>

                <Loading/>
                <ConfirmationDialog/>
                <ConfirmationDialogFixed />


            </div>
        )
    }
}
