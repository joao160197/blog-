import styles from "../styles/home.module.scss";
import Head from "next/head";
import Image from "next/image";
import TechsImage from "../../public/images/techs.svg";
import { GetStaticProps } from "next";
import Prismic from "prismic-javascript";
import { getPrismicClient } from "../services/prismic";
import { RichText } from "prismic-dom";

type Content = {
  subtitle: string;
  mobilecontent: string;
  web_content: string;
  mainbanner: string;
  web_banner: string;
  link_action:string;
  title:string;
  mobile:string;
  mobilebanner: string;
  titleweb: string;
};
interface ContentProps {
  content: Content;
}

export default function Home({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Apaixonado por Tecnologia</title>
      </Head>
      <main className={styles.Container}>
        <div className={styles.ContainerHeader}>
          <section className={styles.Section}>
            <h1>{content.title}</h1>
            <span>
            {content.subtitle}
            </span>
            <a href={content.link_action}>
              <button className={styles.Button} type="button">
                Começar Agora!!!
              </button>
            </a>
          </section>
          <img
            className={styles.mainbanner}
            src={content.mainbanner}
            alt="imagem inicial"
          />
        </div>
        <hr className={styles.divisor} />
        <div className={styles.SectionContant}>
          <section>
            <h2>{content.mobile}</h2>
            <span>
            {content.mobilecontent}
            </span>
          </section>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/blog%2FdemoApp.png?alt=media&token=cfc6c79e-53d8-4d12-9e34-0f0e58e541c2&_gl=1*10gk8ib*_ga*MTMwNDYxNzEwOC4xNjg4MTM3MzMz*_ga_CW55HF8NVT*MTY5NzU1ODA1Ni43NS4xLjE2OTc1NTgwNjcuNDkuMC4w"
            alt="Apps Mobile"
          />
        </div>
        <hr className={styles.divisor} />
        <div className={styles.SectionContant}>
          <img
            src={content.web_banner}
            alt="Apps Mobile"
          />
          <section>
            <h2>{content.titleweb}</h2>
            <span>
             {content.web_content}
            </span>
          </section>
        </div>

        <div className={styles.Footer}>
          <Image src={TechsImage} alt="Linguagens que serão Aprendidas" />
          <h2>
            Mais de <span className={styles.Alunos}>15 mil</span> já levaram sua
            carreira ao próximo nível.
          </h2>
          <span>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            interdum nec ante sodales placerat.{" "}
          </span>
          <a href={content.link_action}>
            <button type="button">COMEÇAR AGORA!</button>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient(undefined);

  const response = await prismic.query([
    Prismic.Predicates.at("document.type", "home"),
  ]);


  const {
    title,
    subtitle,
    linkaction,
    mobile,
    mobilecontent,
    mobilebanner,
    titleweb,
    web_content,
    web_banner,
    mainbanner
  } = response.results[0].data;

  const content = {
    title: title,
    mainbanner:mainbanner.url,
    subtitle: RichText.asText(subtitle),
    link_action:linkaction.url,
    mobile:mobile,
    mobilecontent: RichText.asText(mobilecontent),
    mobilebanner: mobilebanner.url,
    titleweb: titleweb,
    web_content: RichText.asText(web_content),
    web_banner: web_banner.url,
  };

  return {
    props: {
      content,
    },
    revalidate: 60 * 2, //gerado  a cada dois minutos
  };
};
