import React from 'react'
import { observer } from 'mobx-react'
import appStore from './App.store'

export default observer(() => (
    <div style={{
        width: 200,
        height: 200,
        border: '1px solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 'calc(50% - 100px)',
        top: 'calc(50% - 100px)'
    }}>
        {appStore.isLoading ? 'Loading' : 'Not loading'}
    </div>
))