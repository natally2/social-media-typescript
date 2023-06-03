import { ChangeEvent, FormEvent, useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

type Author = {
  name: string,
  role: string,
  avatarUrl: string
}

export interface IPost {
  id: number;
  author: Author,
  content: string,
  publishedAt: Date
}

interface PostProps {
  post: IPost;
}

export const Post = ({ post }: PostProps) => {
  const [comments, setComments] = useState<string[]>([
    'Show de bola!'
  ]);

  const [newComment, setNewComment] = useState<string>('');

  const publishedDateFormatted: string = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", { 
    locale: ptBR,
  });
  const publishedDateRelativeToNow: string = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true

  });

  const handleSubmitComment = (event: FormEvent) => {
    event.preventDefault();
    setComments(previousState => ([
      ...previousState, newComment 
    ]));
    setNewComment('');
  }

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = event.target.value;
    setNewComment(comment);
  }

  const removeComment = (comment: string) => {
    const updatedComments = comments.filter((item: string) => item != comment)
    setComments(updatedComments);
  }

  const isNewCommentEmpty = newComment.length == 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time 
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>{post.content}</div>

      <form 
        className={styles.commentForm}
        onSubmit={handleSubmitComment}
      >
        <strong>Deixe seu feedback</strong>
        
        <textarea
          onChange={handleTextareaChange}
          value={newComment}
          placeholder="Deixe um comentário"
          required
        />

        <footer className={styles.footer}>
          <button 
            type="submit"
            disabled={isNewCommentEmpty}
          >
            Publicar
            </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment 
            key={comment} 
            content={comment} 
            onRemoveComment={removeComment} 
          />
        ))}
      </div>
    </article>
  );
}