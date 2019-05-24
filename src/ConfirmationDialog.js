import React from 'react'
import { observer } from 'mobx-react'
import appStore from './App.store'

export default observer(() => (
    <>
        {
            appStore.confirmation.title &&
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
                    <h2>{appStore.confirmation.title}</h2>
                    <p>{appStore.confirmation.description}</p>
                    {
                        appStore.confirmation.children
                    }
                </div>

            </div>
        }
    </>
))