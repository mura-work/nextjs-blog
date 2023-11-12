import { Layout } from "../../components/layout.tsx";
import { getAllPostIds, getPostData } from "../../lib/posts.ts";
import Head from "next/head";
import { Date } from "../../components/date.tsx";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

type Post = {
  title: string;
  date: string;
  contentHtml: Element;
};

type paramsType = {
  postData: Post;
};

export default function Post({ postData }: paramsType) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths = (async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const id = params?.id
    ? Array.isArray(params.id)
      ? params.id.join("")
      : params.id
    : "";
  const postData = await getPostData(id);
  return {
    props: {
      postData,
    },
  };
}) satisfies GetStaticProps;
