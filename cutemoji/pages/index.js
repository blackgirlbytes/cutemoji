import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import SearchBar from './components/SearchBar'
// import EmojiCards from './components/EmojiCards';
import SearchWithEmojiCards from './components/SearchWithEmojiCards';
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR(
    "https://api.github.com/emojis",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  const formattedData = Object.entries(data).map((entry) => ({ emoji_name: entry[0], emoji_url: entry[1] }));
  return (
    <div className={styles.container} class="bg-gradient-to-r from-blue-100 via-pink-200 to-blue-100">
      <Head>
        <title>Cutemoji</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/cooleroctocat.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          CuteMoji
        </h1>
        <img class="h-16 w-16" src="https://octodex.github.com/images/twenty-percent-cooler-octocat.png" />



        <SearchWithEmojiCards class="border-yellow-500" apiData={formattedData} />
      </main>
    </div>
  )
}
