import { Section } from "@/components";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { blog_img } from "@/assets/images";
import { Select } from "@/components/select";
import Pagination from "@/components/pagination";
import { useState } from "react";

const Posts = () => {
  const posts = [
    {
      id: "1",
      date: "13 Sept., 2022.",
      title:
        "Setting the standard with the best and most stable spreads on Farlo’s top assets",
      description:
        "The difference or gap between the Bid and Ask price is one of the most critical factors in trading..",
      image: blog_img,
    },
    {
      id: "1",
      date: "13 Sept., 2022.",
      title:
        "Setting the standard with the best and most stable spreads on Farlo’s top assets",
      description:
        "The difference or gap between the Bid and Ask price is one of the most critical factors in trading..",
      image: blog_img,
    },
    {
      id: "1",
      date: "13 Sept., 2022.",
      title:
        "Setting the standard with the best and most stable spreads on Farlo’s top assets",
      description:
        "The difference or gap between the Bid and Ask price is one of the most critical factors in trading..",
      image: blog_img,
    },
    {
      id: "1",
      date: "13 Sept., 2022.",
      title:
        "Setting the standard with the best and most stable spreads on Farlo’s top assets",
      description:
        "The difference or gap between the Bid and Ask price is one of the most critical factors in trading..",
      image: blog_img,
    },
    {
      id: "1",
      date: "13 Sept., 2022.",
      title:
        "Setting the standard with the best and most stable spreads on Farlo’s top assets",
      description:
        "The difference or gap between the Bid and Ask price is one of the most critical factors in trading..",
      image: blog_img,
    },
    {
      id: "1",
      date: "13 Sept., 2022.",
      title:
        "Setting the standard with the best and most stable spreads on Farlo’s top assets",
      description:
        "The difference or gap between the Bid and Ask price is one of the most critical factors in trading..",
      image: blog_img,
    },
    {
      id: "1",
      date: "13 Sept., 2022.",
      title:
        "Setting the standard with the best and most stable spreads on Farlo’s top assets",
      description:
        "The difference or gap between the Bid and Ask price is one of the most critical factors in trading..",
      image: blog_img,
    },
    {
      id: "1",
      date: "13 Sept., 2022.",
      title:
        "Setting the standard with the best and most stable spreads on Farlo’s top assets",
      description:
        "The difference or gap between the Bid and Ask price is one of the most critical factors in trading..",
      image: blog_img,
    },
    {
      id: "1",
      date: "13 Sept., 2022.",
      title:
        "Setting the standard with the best and most stable spreads on Farlo’s top assets",
      description:
        "The difference or gap between the Bid and Ask price is one of the most critical factors in trading..",
      image: blog_img,
    },
  ];

  const [page, setPage] = useState(1);

  const options = [
    { value: "forex", label: "Forex" },
    { value: "crypto", label: "Crypto" },
    { value: "stocks", label: "Stocks" },
    { value: "commodities", label: "Commodities" },
  ];
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <Select
          parentClassName={styles.select}
          label="Category"
          className="ml-auto"
          options={options}
        />
        <div className={styles.cards}>
          {posts.map((item, index) => (
            <div key={`post-${index}`} className={styles.card}>
              <Image
                className={styles.card__img}
                src={item.image}
                width={854}
                height={520}
                alt=""
              />
              <div className={styles.card__content}>
                <p className={styles.card__date}>{item.date}</p>
                <p className={styles.card__ttl}>{item.title}</p>
                <p className={styles.card__txt}>{item.description}</p>
                <Link className={styles.card__link} href={"/"}>
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          className="border-t border-[#E9EAEB]"
          totalPages={20}
          currentPage={page}
          onPageChange={setPage}
        />
      </Section>
    </>
  );
};

export { Posts };
