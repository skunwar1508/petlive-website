import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import common from "@/services/common";
import { useCallback, useEffect, useState } from "react";
import authAxios from "@/services/authAxios";
import PageModule from "@/components/pagination/pagination";
import Link from "next/link";

export default function Communities() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const searchString = searchParams.get("searchString") || "";

    const [paginData, setPaginData] = useState({
        list: [],
        activePage: page,
        itemsCountPerPage: 10,
        totalItemsCount: 0,
    });

    const getData = useCallback(async () => {
        common.loader(true);
        try {
            const res = await authAxios({
                method: "POST",
                url: `/community/paginate`,
                data: {
                    page,
                    perPage: 10,
                    searchString: searchString,
                },
            });
            setPaginData((prev) => ({
                ...prev,
                list: res?.data?.data || [],
                activePage: page,
                totalItemsCount: res?.data?.totalCount || 0,
            }));
        } catch (error) {
            common.error(error);
        }
        common.loader(false);
    }, [page, searchString]);

    useEffect(() => {
        getData();
    }, [getData]);

    const pageHasChanged = (pageNumber) => {
        if (pageNumber !== paginData.activePage) {
            router.push(`/blogs?page=${pageNumber}${searchString ? `&searchString=${searchString}` : ""}`);
        }
    };

    return (
        <>
            <section className="page-section community-page">
                <h1 className="heading-secondary">New Community</h1>
                <div className="container">
                    <div className="row g-4">
                        {/* Right side - small blogs */}
                        {paginData?.list?.map((d, index) => (
                            <div key={index} className="col-lg-4 d-flex flex-column gap-3">
                                <Link href={`/community/info/${d?._id}`}>
                                    <div className="blog-card  ">
                                        <img
                                            src={d?.image?.path || "/assets/images/default.png"}
                                            alt={d?.name}
                                            className="img-fluid"
                                        />
                                        <div className="blog-text">
                                            <h5>{d?.name}</h5>
                                            <p>{common.truncateAndClean(d?.description, 150)}</p>
                                            <div className="cta-btn">Join Community</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        {paginData?.list?.length > 0 && (
                            <div className="d-flex justify-content-center mt-4">
                                <PageModule
                                    totalItems={paginData.totalItemsCount}
                                    itemsPerPage={paginData.itemsCountPerPage}
                                    currentPage={paginData.activePage}
                                    range={3}
                                    theme="paging-4"
                                    pageChange={pageHasChanged}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
