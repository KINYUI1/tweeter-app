const React = require('react')
const DefaultLayout = require("./Layout/Default");

const New = ()=>{
    return(
        <DefaultLayout title='New tweet'>
        <div>
            <h1>Create a new tweet</h1>
        <form action='/api/tweetS' method='POST'>
           Title: <input type='text' required name='title'/>
           Author: <input type='text' required name='author'/>
           Body: <textarea required name='body'></textarea>
            <input type='submit' value='Post'/>
        </form>
        </div>
        </DefaultLayout>
    )
}

module.exports = New