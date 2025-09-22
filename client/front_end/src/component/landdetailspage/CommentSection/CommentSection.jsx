import React, { useState, useEffect } from 'react';
import './CommentSection.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const initialComments = [
  {
    name: 'Yaman Attar',
    date: '16 July, 2022',
    stars: 4,
    comment:
  'After touring the agricultural land, I was impressed by the rich soil quality and its potential for high crop yields.'  },
  {
    name: 'Haya Bawwab',
    date: '12 April, 2022',
    stars: 3,
    comment:
    'Many farmers believe that the irrigation system in this area needs improvement to maximize productivity.'
  },
];


export default function CommentSection() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  const handlePost = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          name: 'Anonymous',
          date: new Date().toLocaleDateString(),
          stars: rating,
          comment: newComment,
        },
      ]);
      setNewComment('');
      setRating(0);
    }
  };

  return (
    <div className="comment-container">
      <div className="add-comment">
        <textarea
          placeholder="Add your comment:"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? 'star filled' : 'star'}
            >
              ★
            </span>
          ))}
        </div>
        <button className='post' onClick={handlePost}>Post</button>
      </div>
      {comments.map((c, index) => (
        <div className="comment" key={index}>
          <div className="comment-header">
              <div style={{    display: "flex",alignItems: "center"}}>
                    <span className="user-icon">👤</span>
                    <p style={{ marginBottom:"-9px",fontSize:"20px"}}>{c.name}</p>
             </div>
            <p className="date">{c.date}</p>
          </div>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < c.stars ? 'star filled' : 'star'}>
                ★
              </span>
            ))}
          </div>
          <p className="comment-text">{c.comment}</p>
        </div>
        
      ))}
    </div>
  );
}

// const [comments, setComments] = useState(initialComments);
// const [newComment, setNewComment] = useState('');
// const [rating, setRating] = useState(0);

// export default function CommentSection() {


//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [rating, setRating] = useState(0);

//   // 📌 1. عند فتح الصفحة: اجلب التعليقات من القاعدة
//   useEffect(() => {
//     axios
//       .get(`/api/v1/lands/${landId}/reviews`)
//       .then((res) => {
//         setComments(res.data.data || []);
//       })
//       .catch((err) => console.error('Error fetching comments:', err));
//   }, [landId]);

//   // 📌 2. عند إضافة تعليق جديد
//   const handlePost = () => {
//     if (newComment.trim()) {
//       axios
//         .post(`/api/v1/lands/${landId}/reviews`, {
//           name: 'Anonymous',
//           stars: rating,
//           comment: newComment,
//         })
//         .then((res) => {
//           // أضف التعليق الجديد القادم من السيرفر إلى القائمة
//           setComments([...comments, res.data.data]);
//           setNewComment('');
//           setRating(0);
//         })
//         .catch((err) => console.error('Error posting comment:', err));
//     }
//   };
//   return (
//     <div className="comment-container">
//     <div className="add-comment">
//       <textarea
//         placeholder="Add your comment:"
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//       />
//       <div className="rating">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             onClick={() => setRating(star)}
//             className={star <= rating ? 'star filled' : 'star'}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//       <button className="post" onClick={handlePost}>
//         Post
//       </button>
//     </div>

//     {comments.map((c, index) => (
//       <div className="comment" key={index}>
//         <div className="comment-header">
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span className="user-icon">👤</span>
//             <p style={{ marginBottom: '-9px', fontSize: '20px' }}>{c.name}</p>
//           </div>
//           <p className="date">
//             {c.date ? new Date(c.date).toLocaleDateString() : ''}
//           </p>
//         </div>
//         <div className="stars">
//           {[...Array(5)].map((_, i) => (
//             <span key={i} className={i < c.stars ? 'star filled' : 'star'}>
//               ★
//             </span>
//           ))}
//         </div>
//         <p className="comment-text">{c.comment}</p>
//       </div>
//     ))}
//   </div>
// );
// }