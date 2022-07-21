import {useQuery} from "@apollo/client";
import {allQuery} from "./config/apolloServices/allQueries";
import styles from '../styles/Feed.module.css';
import {UpvoteLayout} from "./partialComponents/UpvoteComponents";
import {CardAvatar} from "./partialComponents/avatarComponents";
import {useAuth} from "./config/authConfig/authProvider";
import {useState} from "react";

const Feed = () => {
    const {data} = useQuery(allQuery);
    const {signOut, getAuthToken, postNew, upvote} = useAuth();
    const token = getAuthToken();
    const [postModal, setPostModal] = useState(false);

    const [postState, setPostState] = useState({
        url: '',
        description: ''
    });

    const modalOpenHandler = () => {
        setTimeout(() => {
            setPostModal(true);
        }, 150);
    }

    const modalCloseHandler = () => {
        setTimeout(() => {
            setPostModal(false);
        }, 150);
    }

    const postHandler = (e) => {
        e.preventDefault();
        postNew(postState).then(() => {
            console.log('ok');
        });
    }

    const voteHandler = (e) => {
        let obj = {
            linkId: e.target.id
        }
        upvote(obj);
    }

    return (
        <>
            {
                token ? <>
                    <div className={styles.Feed__SignOut}>
                        <button className={styles.Feed__SignOut__Btn} onClick={modalOpenHandler}>Post</button>
                        <button className={styles.Feed__SignOut__Btn} onClick={signOut}>Sign Out</button>
                    </div>
                    <section className={styles.Feed__List}>
                        {data?.feed.links.map((el, i) => {
                            return (
                                <div className={styles.Feed__Card} key={i}>
                                    <div className={styles.Feed__Card__Top__Info}>
                                        <CardAvatar/>
                                        <UpvoteLayout votes={el.votes} id={el.id} description={el.description}/>
                                    </div>
                                    <div className={styles.Feed__Card__PostedBy}>
                                        <img width='50px' height='50px' className={styles.Upvote__Btn} id={el.id}
                                             onClick={voteHandler}/>
                                        <p className={styles.Feed__Card__PostedBy__Text}>Posted
                                            by {el.postedBy.name}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                    <div
                        className={`${postModal ? styles.Post__Modal__Bg : null} ${postModal ? styles.Modal__Opened : null}`}>
                        {postModal ? <section className={styles.Post__Modal}>
                                <div className={styles.Modal__Close}>
                                    <img width='15px' height='15px' className={styles.Modal__Close__Icon}
                                         onClick={modalCloseHandler}/>
                                </div>
                                <form onSubmit={postHandler}>
                                    <div>
                                        <h2 className={styles.Post__Modal__Title__Text}>New Post</h2>
                                    </div>
                                    <div>
                                        <h4>Enter URL of Post</h4>
                                        <input required value={postState.url}
                                               onChange={(e) => setPostState({...postState, url: e.target.value})}
                                               className={styles.Post__Modal__Input} placeholder='Url'/>
                                    </div>
                                    <div>
                                        <h4>Enter Description of Post</h4>
                                        <textarea required maxLength='100' value={postState.description}
                                                  onChange={(e) => setPostState({
                                                      ...postState,
                                                      description: e.target.value
                                                  })}
                                                  className={`${styles.Post__Modal__Input} ${styles.Textarea__Input}`}
                                                  placeholder='Description'/>
                                    </div>
                                    <div className={styles.Post__Modal__Btn__Block}>
                                        <button type='submit' className={styles.Post__Modal__Btn__Submit}>Post</button>
                                    </div>
                                </form>
                            </section>
                            : null}
                    </div>
                </> : null
            }
        </>
    )
}

export default Feed;