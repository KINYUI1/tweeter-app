const React = require('react')
const DefaultLayout = require("./Layout/Default");

const Edit = ({tweet})=>{
    return(
        <DefaultLayout title='Edit tweet'>
        <div>
            <h1>Create a new tweet</h1>
        <form action={`/api/tweets/${tweet._id}?_method=PUT`} method='POST'>
           Title: <input type='text' required name='title' defaultValue={tweet.title}/>
           Body: <textarea required name='body' defaultValue={tweet.body}></textarea>
           <input type='checkbox' name='sponsored' defaultChecked={tweet.sponsored}/>
            <input type='submit' value='UPDATE'/>
        </form>
        </div>
        </DefaultLayout>
    )
}

module.exports = Edit