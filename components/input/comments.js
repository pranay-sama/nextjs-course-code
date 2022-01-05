import { useEffect, useState } from 'react';
import useSWR from 'swr';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const { data, error } = useSWR(`/api/comments/${eventId}`);

  useEffect(() => {
    if (data) {
      console.log(data.comments);
      setComments(data.comments);
    }
    if (error) {
      console.error(error);
    }
  }, [data]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
    });
    // .then((data) => console.log(data));
    // send data to API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
