const React = require("react");
const DefaultLayout = require("./Layout/Default");

function Show({ tweet }) {
  return (
    <DefaultLayout title="Show">
    <div>
      <div>{tweet.title}</div>
      <div>{tweet.author}</div>
      <div>{tweet.body}</div>
      <div>{tweet.sponsored? <div>{tweet.sponsored}</div>:''}</div>
      <div>{new Date(tweet.createdAt).toLocaleDateString()}</div>
      {/* COMMENTS MAPPING */}
      <div>
        {
          tweet.comments.length > 0 && (
            tweet.comments.map(comment => {
              return (
                <div>
                  <div>{comment.body}</div>
                  <div>{comment.author}</div>
                </div>
              )
            })
          )
        }
      </div>
      <div>
        <h3>Comment</h3>
        <form method="POST" action={`/api/tweets/add-comment/${tweet._id}?_method=PUT`}>
         comment: <input type="text" name="body" required/><br/>
        author: <input type="text" name="author" required/><br/>
          <input type="submit" value="Add Comment" />
        </form>
      </div>
    </div>
    </DefaultLayout>
  );
}

module.exports = Show;





