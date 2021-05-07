import Link from 'next/link';

// import renderHTML from 'react-render-html'; // to render html for excerpts for each blog 
// {renderHTML(blog.excerpt)} - Not using it because we don't want to render HTML tags inside excerpt for now, may be later

// import { stripHtml } from 'string-strip-html'; // to strip / remove HTML tags & styles from html text

import { htmlToText } from 'html-to-text';// Refer:  https://www.npmjs.com/package/html-to-text 

import moment from 'moment'; // for displaying date-time in readable format (' few minutes ago ')
import { API } from '../../config';


// -------------------------------------------------------

const SmallCard = ({ blog }) => {

  // -----------------------------------------------------

  return (

    <div className="card related-blog-card mt-2" style={{
      // position: "relative",
      // height: "500px",
      maxHeight: "500px",
      // overflow: "hidden",
      boxShadow: "4px 8px 15px #888888",
      // maxWidth: "200px",
      // width: "100%",
    }}>

      {/* ----------------------------------------------------------- */}

      <div className="related-blog-card-featured-image mb-2" style={{

        height: "150px",
        // maxHeight: "150px",
        position: 'initial',
        width: "100%",
        // overflow: "hidden",
        // display: "flex",
      }}>

        <Link href={`/blogs/${blog.slug}`} passHref>
          <a>
            <img
              onError={(image) => image.target.setAttribute("src", "https://via.placeholder.com/150")}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
              className="img related-blog-img"
              style={{
                height: "150px",
                // maxHeight: '150px',
                width: '100%',
                objectFit: "cover",
                justifyContent: "center"
              }}
            />
          </a>
        </Link>
      </div>

      {/* ----------------------------------------------------------- */}

      <div className="related-blog-card-body pl-2 pr-2"
        style={{
          overflow: "hidden",
          position: "relative"
        }}>


        <div className="related-blog-title">
          <Link href={`/blogs/${blog.slug}`} passHref>
            <a>
              <h5 className="cart-title" style={{ fontSize: "1.125rem" }}>{blog.title}</h5>
            </a>
          </Link>
        </div>

        {/* ----------------------- */}

        <div className="related-blog-excerpt" style={{
          fontSize: "0.9rem",
          // fontSize: "14px",
          overflow: "hidden",
          // maxHeight: "250px",
          whiteSpace: "normal",
        }}>

          {/* {renderHTML(blog.excerpt)} */}

          {/* {stripHtml(blog.excerpt).result} */}

          {htmlToText(blog.excerpt, {
            wordwrap: 360,
            tags: {
              'a': { options: { ignoreHref: true } }, // to Hide href/urls
              'img': { format: 'skip' }, // to ignore images
              'h1': { options: { uppercase: true } },
              'table': { options: { uppercaseHeaderCells: true } }
            }
          })
          }

        </div>


      </div>
      {/* ----------------------------------------------------------- */}

      <div className="related-blog-author" style={{
        position: "absolute",
        fontSize: "0.9rem",
        bottom: "0px",
        textAlign: "center",
        left: "0",
        right: "0",
        background: "#FFFAFA",
      }}>
        <p style={{ marginBottom: "0px", }}>
          Posted {moment(blog.updatedAt).fromNow()} by {(blog.postedBy) ?
            (
              <Link href={`/profile/${blog.postedBy.username}`} passHref>
                <a>{blog.postedBy.username}</a>
              </Link>
            ) : (
              <a className="text-muted">&lt;User Removed&gt;</a>
            )
          }
        </p>
      </div>

      {/* ----------------------------------------------------------- */}

    </div >
  );

};



export default SmallCard;