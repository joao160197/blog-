import { GetStaticProps } from "next";
import { FaFacebook ,  FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import Head from "next/head";
import styles from "./styles.module.scss";
import {getPrismicClient} from "../../services/prismic";
import {RichText} from 'prismic-dom';
import Prismic from "prismic-javascript";

type Content = {
    title: string,
    description: string,
    banner: string,
    facebook: string,
    insta: string,
    youtube: string,
    linkedin: string
  };

interface ContentProps{
    content: Content;
}

export default function About({content}:ContentProps){
    return(
        <>
            <Head>
                <title>Sobre Nós</title>
            </Head>
            <main className={styles.Container}>
        
            <div className={styles.ContainerHeader}>

                <section className={styles.Text}>
                   <h1>{content.title}</h1>
                   <p>{content.description}</p>
                   <a rel="stylesheet" href={content.facebook}><FaFacebook size={40} /></a>
                   <a rel="stylesheet" href={content.insta} ><FaInstagram size={40} /></a>
                   <a rel="stylesheet" href={content.youtube}><FaYoutube size={40} /></a>
                   <a rel="stylesheet" href={content.linkedin}><FaLinkedin size={40} /></a>
                </section>

                <img src={content.banner}  alt="imagem sobre"/>

            </div>

            </main>
        </>
    )
    
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
  
    const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'about')
    ])

const {
    title,
    description,
    banner,
    facebook,
    insta,
    youtube,
    linkedin
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    description:RichText.asText(description),
    banner: banner.url,
    facebook: facebook.url,
    insta: insta.url,
    youtube: youtube.url,
    linkedin: linkedin.url
  }

    return{
        props:{
          content,
        },
        revalidate: 60 * 15 //a cada 15 minutos ele vai ser revalidado 
    }
}