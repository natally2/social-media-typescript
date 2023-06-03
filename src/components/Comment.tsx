import { useState } from 'react';
import { ThumbsUp, Trash } from '@phosphor-icons/react';

import styles from './Comment.module.css';
import { Avatar } from './Avatar';

interface CommentProps {
  content: string;
  onRemoveComment: (comment: string) => void;
}

export const Comment = ({ content, onRemoveComment }: CommentProps) => {
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeComment = () => {
    setLikeCount(prevState => prevState + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar 
        hasBorder={false}
        src="https://github.com/ed-lima.png"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.commentInfo}>
              <strong>Eduardo Lima</strong>
              <time
                title="02 de Junho às 00:09h" 
                dateTime="2023-06-02 00:09:30"
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button 
              title="Deletar comentário"
              onClick={() => onRemoveComment(content)}
            >
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} /> 
            Aplaudir 
            <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}