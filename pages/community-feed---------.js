// components/CommunityFeed.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

const initialPosts = [
  {
    id: "p1",
    user: { name: "User Name", avatar: "/avatars/user-1.jpg" },
    text: "Lorem ipsum dolor sit amet cuto at faucibus solliciti enim. Lorem ipsum dolor sit amet cuto at faucibus solliciti enim.",
    stats: { likes: 100, comments: 60, shares: 80 },
  },
  {
    id: "p2",
    user: { name: "User Name", avatar: "/avatars/user-2.jpg" },
    text: "Lorem ipsum dolor sit amet cuto at faucibus solliciti enim. Lorem ipsum dolor sit amet cuto at faucibus solliciti enim.",
    image: "/posts/dog.jpg",
    stats: { likes: 180, comments: 100, shares: 60 },
  },
  {
    id: "p3",
    user: { name: "User Name", avatar: "/avatars/user-3.jpg" },
    text: "Lorem ipsum dolor sit amet cuto at faucibus solliciti enim. Lorem ipsum dolor sit amet cuto at faucibus solliciti enim.",
    stats: { likes: 100, comments: 60, shares: 80 },
  },
];

export default function CommunityFeed() {
  const [posts] = useState(initialPosts);

  return (
    <section className="container py-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 m-0">Community Name</h1>
        <a
          aria-label="Info"
          className="text-body-tertiary d-inline-flex align-items-center justify-content-center rounded-circle info-btn"
          href="#"
        >
          <i className="bi bi-info-lg" />
        </a>
      </div>

      {/* Feed */}
      <div className="vstack gap-4">
        {posts.map((post) => (
          <article key={post.id} className="post">
            {/* User row */}
            <div className="d-flex align-items-start gap-2">
              <div className="avatar">
                <Image
                  src={post.user.avatar}
                  alt={`${post.user.name} avatar`}
                  width={44}
                  height={44}
                  className="rounded-circle object-fit-cover"
                />
              </div>

              <div className="flex-grow-1">
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <span className="fw-semibold small">{post.user.name}</span>
                </div>
                <p className="mb-2 small text-body-secondary">{post.text}</p>

                {/* Post image (optional) */}
                {post.image && (
                  <div className="ratio ratio-1x1 rounded post-image mb-2">
                    <Image
                      src={post.image}
                      alt="Post media"
                      fill
                      className="rounded object-fit-cover"
                      sizes="(min-width: 992px) 520px, 100vw"
                    />
                  </div>
                )}

                {/* Stats row */}
                <div className="d-flex align-items-center gap-3 text-body-tertiary small">
                  <button className="btn btn-link p-0 d-inline-flex align-items-center gap-1 text-decoration-none hover-raise">
                    <i className="bi bi-hand-thumbs-up" />
                    <span>{post.stats.likes}</span>
                  </button>
                  <button className="btn btn-link p-0 d-inline-flex align-items-center gap-1 text-decoration-none hover-raise">
                    <i className="bi bi-chat-square-text" />
                    <span>{post.stats.comments}</span>
                  </button>
                  <button className="btn btn-link p-0 d-inline-flex align-items-center gap-1 text-decoration-none hover-raise">
                    <i className="bi bi-reply" />
                    <span>{post.stats.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Comment composer */}
        <form className="composer d-flex align-items-center gap-2 rounded-3 px-3 py-2">
          <input
            type="text"
            className="form-control border-0 shadow-0 ps-0"
            placeholder="Write Comment Here..."
            aria-label="Write a comment"
          />
          <button
            type="button"
            className="btn btn-link p-0 text-body-tertiary d-inline-flex align-items-center"
            aria-label="Attach a file"
          >
            <i className="bi bi-paperclip" />
          </button>
          <button
            type="submit"
            className="btn btn-link p-0 text-body-tertiary d-inline-flex align-items-center"
            aria-label="Send comment"
          >
            <i className="bi bi-send" />
          </button>
        </form>
      </div>
    </section>
  );
}
