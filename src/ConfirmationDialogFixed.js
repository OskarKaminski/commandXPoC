import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'semantic-ui-react'
import AppStore from './App.store'

export default observer(() => (
    <>
        {
            AppStore.confirmationFixed.title &&
            <div style={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,.8)'
            }}>
                <div style={{
                    width: 400,
                    height: 400,
                    backgroundColor: 'white',
                    border: '1px solid',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    padding: 20
                }}>
                    <h2>{AppStore.confirmationFixed.title}</h2>
                    <p>{AppStore.confirmationFixed.description}</p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <Button
                            style={{width: '40%'}}
                            primary
                            onClick={AppStore.confirmationFixed.onSuccess}>Confirm</Button>
                        <Button
                            secondary
                            style={{width: '40%'}}
                            onClick={AppStore.closeConfirmationFixed}>Cancel</Button>
                    </div>
                </div>

            </div>
        }
    </>
))