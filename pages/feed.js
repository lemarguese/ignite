import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";
import {allQuery} from "./config/apolloServices/allQueries";
import styles from '../styles/Feed.module.css';
import {UpvoteLayout} from "./partialComponents/UpvoteComponents";
import {CardAvatar} from "./partialComponents/avatarComponents";

const Feed = () => {
    const {data} = useQuery(allQuery);
    return (
        <section className={styles.Feed__List}>
            {data?.feed.links.map((el, i) => {
                return (
                    <div className={styles.Feed__Card} key={i}>
                        <div className={styles.Feed__Card__Top__Info}>
                            <CardAvatar/>
                            <UpvoteLayout votes={el.votes} id={el.id} description={el.description}/>
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