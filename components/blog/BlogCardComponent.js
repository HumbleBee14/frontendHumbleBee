import Link from 'next/link';
// import Image from 'next/image'; // useful for Image optimization and lazy loading 
import renderHTML from 'react-render-html'; // to render html for excerpts for each blog
import moment from 'moment'; // for displaying date-time in readable format (' few minutes ago ')
import { API } from '../../config';




const Card = ({ blog }) => {


  // Show Categories associated with the current Blog
  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (

      <Link key={i} href={`/categories/${c.slug}`} passHref>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>

    ));


  // Show Tags associated with the current Blog
  const showBlogTags = blog => {
    return (
      blog.tags.map((t, i) => (

        <Link key={i} href={`/tags/${t.slug}`} passHref>
          <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
        </Link>
      ))
    );
  };



  // -----------------------------------------------------

  return (

    <div className="lead pb-4">
      <hr />

      <header>
        <Link href={`/blogs/${blog.slug}`} passHref>
          {/* Blog Link/URL & Blog Title */}
          <a className="textClickOnly" style={{ display: "inline-block" }}>
            <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
          </a>
        </Link>
      </header>

      {/* Meta information of Blog - Blog Author and Blog Date / update / create date time.
      NOTE: We are checking if the user who created the original blog Exists or not. If not, then we will show <User Removed> in place of author's username, else it'll crash the app if user deletes accounts */}
      <section style={{ fontSize: "1.01rem" }}>
        <p className="mark ml-1 pt-2 pb-2">
          Written by{' '}
          {(blog.postedBy) ?
            (
              <Link href={`/profile/${blog.postedBy.username}`} passHref>
                <a>{blog.postedBy.username}</a>
              </Link>
            ) : (
              <a className="text-muted">&lt; User Removed &gt;</a>
            )
          }{' '}| Published {moment(blog.updatedAt).fromNow()}
        </p>
      </section>

      {/* Note: In Article <article> we can have Multiple Sections <section>*/}
      <section>
        {/* <p> blog Categories and Tags</p> */}
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <br />
        <br />
        {/* <hr />
        {JSON.stringify(blog.tags)} */}
      </section>

      {/* ------------------------------------------ BLOG ROW (Image + Excerpt) STARTS ---------------------------------------------- */}
      {/* Note: we are using 'row' class here for blog content to put IMAGE on Left Sidebar and Blog Excerpt/content on Right Sidebar of the each article => | image | Blog Excerpt | in a single row*/}
      <div className="row">

        {/* each Blog Featured Image */}

        <div className="col-md-4">

          <section>

            <img
              onError={(image) => image.target.setAttribute("src", "https://via.placeholder.com/150")}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
              className="img img-thumbnail mb-3"
              style={{ maxHeight: '150px', width: 'auto' }}
            />

          </section>

        </div>


        <div className="col-md-8">
          <section>
            <div className="pb-3 blog-card-excerpt-container" style={{
              overflow: "hidden",
              height: "200px",
              // overflow: "scroll",
            }}>
              {renderHTML(blog.excerpt)}
            </div>

            {/* Creating a Button 'Read More' on Blog article section that will refer to the blog url */}
            <Link href={`/blogs/${blog.slug}`} passHref>
              <a className="btn btn-primary mt-1 pt-2">Read more</a>
            </Link>
          </section>
        </div>

      </div>
      {/* ------------------------------------------------------BLOG ROW ENDS------------------------------------------------ */}

    </div>

  );

};

export default Card;