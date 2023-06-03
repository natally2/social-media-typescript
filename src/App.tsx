import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Post, IPost } from './components/Post';

import styles from './App.module.css';

const posts: IPost[] = [
  {
    id: 1,
    author: {
      name: 'Eduardo Lima',
      role: 'Full-stack Developer',
      avatarUrl: 'https://github.com/ed-lima.png'
    },
    content: 'Hello World!',
    publishedAt: new Date('2023-06-02 01:40:00')
  },
  {
    id: 1,
    author: {
      name: 'Natally Riqueto',
      role: 'Web Developer',
      avatarUrl: 'https://github.com/natally2.png'
    },
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut delectus, hic voluptates natus necessitatibus veritatis, facere recusandae cumque ut tempora neque beatae, dolorem minima? Tempora incidunt cumque unde mollitia minima!',
    publishedAt: new Date('2023-05-20 01:40:00')
  }
];

export const App = () => {

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => (<Post key={post.id} post={post} />))
          }
        </main>
      </div>
    </>
  )
}


