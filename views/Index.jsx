const React = require("react");
const DefaultLayout = require("./Layout/Default");

function Index({ tweets }) {
  return (
    <DefaultLayout title='Tweets'>
      <nav>
        <a href="/tweets/new">Create a new Tweet</a>
      </nav>

      <ul>
        {tweets.map((tweet) => {
          return (
            <li key={tweet._id} className="border p-5">
              <a href={`/tweets/${tweet._id}`}>{tweet.title}</a>
              <p>{tweet.body}</p>
              <p>{tweet.author}</p>

              {/* like butten */}
              <a href={`/api/tweets/add-like/${tweet._id}`}>Like</a>
              <div>
              <span>Likes: {tweet.likes}</span><br/>
              </div>
              <span>{tweet.sponsored ? 'Sponsored': ''}</span><br/>
              {/* update butten */}
                <a href={`/tweet/${tweet._id}/edit`}>UPDATE</a>

                {/* delete  */}
              <form method="POST" action={`/api/tweetS/${tweet._id}?_method=DELETE`}>
                <input type="submit" value='DELETE'/>
              </form>
            </li>
          );
        })}
      </ul>
    </DefaultLayout>
  );
}
module.exports = Index;