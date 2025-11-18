
import { paginateBlog } from "@/utils/serverApi";
import BlogList from "@/components/blog/blogList";
import { useRouter } from "next/router";

export default function Blogs({ initialPaginData }) {
  const router = useRouter();


  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      router.push(
        `/blogs?page=${pageNumber}${
          searchString ? `&searchString=${searchString}` : ""
        }${category ? `&category=${category}` : ""}`
      );
    }
  };

  return (
    <>
      <BlogList initialPaginData={initialPaginData} pageHasChanged={pageHasChanged} />
    </>
  );
}


export async function getServerSideProps(context) {
  const paginData = await paginateBlog({
    page: context.query.page || 1,
    perPage: 10,
    searchString: context.query.searchString || "",
    category: context.query.category || "",
  });

  return {
    props: {
      initialPaginData: paginData,
    },
  };
}