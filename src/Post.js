import React from 'react'
import { Query } from "react-apollo"
import gql from 'graphql-tag'

const query = gql`
  query post($id: ID!){
    post(id: $id){
      id
      title
    }
  }
`

export default ({id}) => (
    <Query query={query} variables={{id}}>
        {({ loading, error, data: {post} }) => {
            if (loading) return <p>Rendering...</p>
            if (error) return <p>Error :(</p>

            return (
                <div>
                    <p>id: {post.id}</p>
                    <p>title: {post.title}</p>
                </div>
            )
        }}
    </Query>
)