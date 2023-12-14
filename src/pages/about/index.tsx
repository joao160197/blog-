import { GetStaticProps } from "next";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import Head from "next/head";
import styles from "./styles.module.scss";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Prismic from "prismic-javascript";

type Content = {
  title: string;
  description: string;
  banner: string;
  facebook: string;
  insta: string;
  youtube: string;
  linkedin: string;
};

interface ContentProps {
  content: Content;
}

export default function About({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Sobre Nós</title>
      </Head>
      <main className={styles.Container}>
        <div className={styles.ContainerHeader}>
          <section className={styles.Text}>
            <h1>JP Informatica</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non
              ultricies velit. Fusce lobortis convallis leo, eget eleifend
              tortor porta sit amet. Praesent at ornare sapien. Aliquam erat
              volutpat. Sed condimentum, dui non ornare vestibulum, sem arcu
              molestie magna, sed hendrerit eros velit ultrices magna. In non
              massa non tortor vehicula commodo. Cras dolor neque, sollicitudin
              quis felis et, dignissim molestie tortor. Nunc quis ante eget
              libero aliquet euismod sit amet non metus. Etiam nisl risus,
              pretium fringilla diam nec, placerat accumsan tellus. Duis aliquet
              posuere leo nec egestas. Mauris molestie finibus turpis, id
              commodo ante pharetra at. Phasellus elementum eros eu est
              dignissim, ac tempus felis dapibus. Maecenas porttitor erat lacus.
              Sed sagittis quam a velit mattis, quis tempus tortor sagittis.
              Aenean interdum fringilla venenatis. Mauris aliquet sit amet nisi
              quis mollis. Proin molestie eu nisl nec viverra.
            </p>
            <a rel="stylesheet" href="https://www.facebook.com/">
              <FaFacebook size={40} />
            </a>
            <a rel="stylesheet" href="https://www.instagram.com/">
              <FaInstagram size={40} />
            </a>
            <a rel="stylesheet" href="https://www.youtube.com/">
              <FaYoutube size={40} />
            </a>
            <a rel="stylesheet" href="https://www.linkedin.com/">
              <FaLinkedin size={40} />
            </a>
          </section>

          <img src="https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/blog%2Fsobre.avif?alt=media&token=5f0b7e53-2fca-4a83-9618-47765b9917db" alt="imagem sobre" />
        </div>
      </main>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//     const prismic = getPrismicClient();

//     const response = await prismic.query([
//       Prismic.Predicates.at('document.type', 'about')
//     ])

// const {
//     title,
//     description,
//     banner,
//     facebook,
//     insta,
//     youtube,
//     linkedin
//   } = response.results[0].data;

//   const content = {
//     title: RichText.asText(title),
//     description:RichText.asText(description),
//     banner: banner.url,
//     facebook: facebook.url,
//     insta: insta.url,
//     youtube: youtube.url,
//     linkedin: linkedin.url
//   }

//     return{
//         props:{
//           content,
//         },
//         revalidate: 60 * 15 a cada 15 minutos ele vai ser revalidado
//     }
// }
