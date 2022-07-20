import React from 'react';
import {useQuery} from "@apollo/client";
import {allQuery} from "./config/apolloServices/allQueries";
import styles from '../styles/Feed.module.css';

const Feed = () => {
    const {data} = useQuery(allQuery);

    const upvotes = (
        data.feed.links.votes.map((el, i) => {
            return (
                <span key={i}>

                </span>
            )
        })
    )

    return (
        <section className={styles.Feed__List}>
            {data?.feed.links.map((el, i) => {
                return (
                   <div className={styles.Feed__Card} key={i}>
                       <div className={styles.Feed__Card__Top__Info}>
                           <div className={styles.Feed__Card__Avatar}>
                               <img width='110px' height='110px' className={styles.Card__Image} alt=''/>
                           </div>
                           <div className={styles.Feed__Card__Top_Description}>
                               <a className={styles.Feed__Card__Top_Description_Text} href={el.url}>{el.description}</a>
                           </div>
                       </div>
                       <div className={styles.Feed__Card__PostedBy}>
                           <p className={styles.Feed__Card__PostedBy__Text}>Posted by {el.postedBy.name}</p>
                       </div>
                   </div>
                )
            })}
        </section>
    )
}

export default Feed;