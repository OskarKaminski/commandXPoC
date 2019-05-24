import React from "react";
import { render } from "react-dom"
import 'semantic-ui-css/semantic.min.css'
import App from "./App";
import {ApolloProvider} from 'react-apollo'
import client from './apollo-client'

let root = document.createElement('div')
document.body.appendChild(root)

render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    root
);

