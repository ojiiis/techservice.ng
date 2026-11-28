// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Functionality
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            const isHidden = mobileNav.classList.toggle('mobile-menu-hidden');
            document.getElementById("mobile-nav").style.top = document.getElementById("site-header").offsetHeight + "px";
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', isHidden);
                icon.classList.toggle('fa-xmark', !isHidden);
            }
        });

        mobileNav.querySelectorAll('a[data-close-menu]').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('mobile-menu-hidden');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Set Current Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 3. Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Homepage blog posts from TechService blog API
    const blogGrid = document.getElementById('blog-posts-grid');
    if (blogGrid) {
        const API = 'https://blog.techservice.ng/api/6';
        fetch(API)
            .then((res) => {
                if (!res.ok) throw new Error('Blog API error');
                return res.json();
            })
            .then((posts) => {
                if (!Array.isArray(posts) || posts.length === 0) {
                    blogGrid.innerHTML = '<p class="blog-empty">No posts available right now. <a href="https://blog.techservice.ng">Visit the blog</a>.</p>';
                    return;
                }
                const stripHtml = (html) => {
                    const tmp = document.createElement('div');
                    tmp.innerHTML = html || '';
                    return (tmp.textContent || tmp.innerText || '').trim();
                };
                const excerpt = (text, max = 140) => {
                    if (!text) return '';
                    if (text.length <= max) return text;
                    return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
                };
                blogGrid.innerHTML = posts.map((post) => {
                    const title = post.title || 'Untitled';
                    const body = excerpt(stripHtml(post.content));
                    const cat = (post.category || '').replace(/-/g, ' ');
                    const date = post.date || '';
                    const uid = post.uid || '';
                    const href = uid ? `https://blog.techservice.ng/post/${uid}` : 'https://blog.techservice.ng';
                    const author = post.post_by || 'TechService';
                    return `
                    <article class="blog-card">
                        <div class="blog-card-meta">
                            <span class="blog-cat">${cat}</span>
                            ${date ? `<time datetime="${date}">${date}</time>` : ''}
                        </div>
                        <h3 class="blog-card-title"><a href="${href}" target="_blank" rel="noopener">${title}</a></h3>
                        <p class="blog-card-excerpt">${body}</p>
                        <div class="blog-card-footer">
                            <span class="blog-author">${author}</span>
                            <a href="${href}" class="blog-read-more" target="_blank" rel="noopener">Read more <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </article>`;
                }).join('');
            })
            .catch(() => {
                blogGrid.innerHTML = '<p class="blog-empty">Unable to load posts. <a href="https://blog.techservice.ng">Visit the blog</a>.</p>';
            });
    }
});
