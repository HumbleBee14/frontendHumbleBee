import Link from 'next/link';

// import renderHTML from 'react-render-html'; // to render html for excerpts for each blog 
// {renderHTML(blog.excerpt)} - Not using it because we don't want to render HTML tags inside excerpt for now. May be later

// import { stripHtml } from 'string-strip-html'; // to strip / remove HTML tags & styles from html text

import { htmlToText } from 'html-to-text';// Refer:  https://www.npmjs.com/package/html-to-text 

import moment from 'moment'; // for displaying date-time in readable format (' few minutes ago ')
import { API } from '../../config';


// -------------------------------------------------------

const SmallCard = ({ blog }) => {

  // -----------------------------------------------------

  return (

    <div className="card related-blog-card">

      <section>
        <Link href={`/blogs/${blog.slug}`} passHref>
          <a>
            <img
              onError={(image) => image.target.setAttribute("src", "https://via.placeholder.com/150")}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
              className="img img-thumbnail related-blog-img mb-3"
              // style={{ height: '190px', width: '100%' }}
              style={{ height: 'auto', maxHeight: '200px', width: '100%' }}
            // style={{ maxHeight: 'auto', width: '100%' }}
            />
          </a>
        </Link>
      </section>


      <div className="card-body card-body-related-blog">

        <section>

          <div className="related-blog-title">
            <Link href={`/blogs/${blog.slug}`} passHref>
              <a>
                <h5 className="cart-title">{blog.title}</h5>
              </a>
            </Link>
          </div>

          <div className="related-blog-excerpt">

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

        </section>

      </div>

      <div className="card-body related-blog-author">
        Posted {moment(blog.updatedAt).fromNow()} by {(blog.postedBy) ?
          (
            <Link href={`/profile/${blog.postedBy.username}`} passHref>
              <a>{blog.postedBy.username}</a>
            </Link>
          ) : (
            <a className="text-muted">&lt; User Removed &gt;</a>
          )
        }
      </div>

    </div >
  );

};



export default SmallCard;