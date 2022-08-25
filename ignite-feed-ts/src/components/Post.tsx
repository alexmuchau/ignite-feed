import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from  'date-fns/locale/pt-br/index'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

interface PostProps {
  author: Author;
  date: Date;
  content: Content[];
}

export function Post({ author, date, content }: PostProps) {
  const [comments, setComments] = useState(['Post muito bosta'])

  const [newCommentText, setNewCommentText] = useState('')
  
  const publishedDateFormatted = format(date, "d 'de' LLLL 'ás' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText('');
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório")
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete: string) {
    const newComments = comments.filter(comment => {
      return comment !== commentToDelete
    })


    setComments(newComments)
  }
  
  const isCommentInputEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>

        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={date.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if(line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name='comment'
          required
          placeholder="Deixe um comentário"
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          onChange={handleNewCommentChange}
        />
        <footer>
          <button type="submit" disabled={isCommentInputEmpty} >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return( 
            <Comment 
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}