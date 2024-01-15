import Head from "next/head";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { GetStaticProps } from "next";
import { useState } from "react";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-dom";

type Post = {
  slug: string;
  title: string;
  cover: string;
  description: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
  page: string;
  totalPage: string;
}

export default function Posts({ posts, page, totalPage }: PostsProps) {
  const [post, setPost] = useState(posts || []);
  const [CurrentPage, setCurrentPage] = useState(Number(page));
  
//buscar novos posts
async function reqPost(pageNumber:number) {
  const prismic = getPrismicClient(undefined);

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    orderings: "[document.last_publication_date desc]", //ordenar as publicassoes na ordem decrecente
    fetch: ["post.title", "post.description", "post.cover"],
    pageSize: 3,
    page: String(pageNumber),
  })

  return response;
}


  async function navigatePage(pageNumber:number){
   const response = await reqPost(pageNumber);

   if(response.results.length === 0){
    return;
   }
   const getPosts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description:post.data.description.find((content) => content.type === "paragraph") ?.text ?? "",
      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  setCurrentPage(pageNumber);
  setPost(getPosts);

}

  return (
    <>
      <Head>
        <title>Blog | JP INFORMÁTICA</title>
      </Head>
      <main className={styles.PostContainer}>
        <div className={styles.Posts}>
          {post.map((post) => (
            <Link key={post.slug} legacyBehavior href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={720}
                  height={410}
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUY/j/AAADoAIPOVWWpwAAAABJRU5ErkJggg=="
                />
                <strong>{post.title}</strong>
                <time>{post.updatedAt}</time>
                <p>{post.description}</p>
              </a>
            </Link>
          ))}
          <div className={styles.navigateButtons}>
            {Number(CurrentPage) >= 2 && (
              <div>
                <button
                  onClick={()=> navigatePage(1)}
                  className={styles.FirstButton}
                  title="Primeiro post"
                  type="button"
                >
                  <FiChevronsLeft size={25} color="var(--blue-900)" />
                </button>

                <button onClick={()=> navigatePage(Number(CurrentPage - 1 ))} className={styles.FirstButton} title="Post anterior">
                  <BsArrowLeftSquareFill size={25} color="var(--blue-900)" />
                </button>
              </div>
            )}
           {Number(CurrentPage)< Number(totalPage) && (
             <div>
             <button
               title="Próximo post"
               type="button"
               className={styles.FirstButton}
               onClick={()=> navigatePage(Number(CurrentPage + 1))}
             >
               <BsArrowRightSquareFill size={25} color="var(--blue-900)" />
             </button>

             <button
               title="Ir até o último post"
               type="button"
               className={styles.SecondButton}
               onClick={()=> navigatePage(Number(totalPage))}
             >
               <FiChevronsRight size={25} color="var(--blue-900)" />
             </button>
           </div>
           )}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient(undefined);

  const response = await prismic.query(
    [Prismic.Predicates.at("document.type", "post")],
    {
      orderings: "[document.last_publication_date desc]", //ordenar as publicassoes na ordem decrecente
      fetch: ["post.title", "post.description", "post.cover"],
      pageSize: 3,
    }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description:
        post.data.description.find((content) => content.type === "paragraph")
          ?.text ?? "",
      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
      page: response.page,
      totalPage: response.total_pages,
    },
    revalidate: 60 * 30, // atualiza a cada 30 minutos.
  };
};
