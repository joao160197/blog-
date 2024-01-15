import { GetServerSideProps } from "next";
import styles from "./post.module.scss";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Head from "next/head";
import Image from "next/image";

interface PostProps {
  post: {
    slug: string;
    title: string;
    description: string;
    cover: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  console.log(post);
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.container}>
         <article className={styles.post}>
           <Image src={post.cover}
            width={720}
            height={410}
            quality={100}
            alt={post.title}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUY/j/AAADoAIPOVWWpwAAAABJRU5ErkJggg=="
           />
           <h1>{post.title}</h1>
           <time>{post.updatedAt}</time>
           <div className={styles.text} dangerouslySetInnerHTML={{__html: post.description}}></div>
         </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { slug } = params ?? { slug: '' }
  const prismic = getPrismicClient(req);
  const response = await prismic.getByUID("post", String(slug), {});

  //caso a pessoa tente acessar uma postagem que nao existe
  if (!response) {
    return {
      redirect: {
        destination: "/posts",
        permanent: false,
      },
    };
  }

  const post = {
    slug: slug,
    title: RichText.asText(response.data.title),
    description: RichText.asHtml(response.data.description),
    cover: response.data.cover.url,
    updatedAt: response.last_publication_date ? new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ): ""
  };

  return {
    props: {
      post,
    },
  };
};
