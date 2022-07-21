import styles from "../../styles/Feed.module.css";
import {Avatar} from "./avatarComponents";
import {useState} from "react";

export const UpvoteList = (props) => {
    return (
        <>
            {
                props.votes.length > 0 ?
                    props.votes.slice(0, 3).map((vote, id) => {
                            return (
                                <Upvote description={props.description} key={id} id={id} votes={props.votes}
                                        firstLetter={vote.user.name[0]}/>
                            )
                        }
                    )
                    :
                    <span className={styles.Upvotes__NoVote}>No upvotes</span>
            }
        </>
    )
}

export const Upvote = (props) => {
    const [isModal, setIsModal] = useState(false);

    const modalOpenHandler = () => {
        setTimeout(() => {
            setIsModal(true);
        }, 150);
    }

    const modalCloseHandler = () => {
        setTimeout(() => {
            setIsModal(false);
        }, 150);
    }

    return (
        <>
            <span key={props.id} className={styles.Upvotes__Item}>
                <Avatar firstLetter={props.firstLetter}/>
                <span className={styles.Upvotes__Pagination} onClick={modalOpenHandler}>
                    {props.id === 2 ? props.votes.slice(3).length > 0 ?
                        `... ${props.votes.slice(3).length} more upvotes` :
                        null : null}
                </span>
            </span>
            <div className={`${isModal ? styles.Upvote__Modal__Bg : null} ${isModal ? styles.Modal__Opened : null}`}>
                {
                    isModal ?
                        <section className={styles.Modal__Upvotes}>
                            <div className={styles.Modal__Close}>
                                <img width='15px' height='15px' className={styles.Modal__Close__Icon}
                                     onClick={modalCloseHandler} />
                            </div>
                            <div>
                                <p className={styles.Modal__Upvotes__Title}>Users who upvoted
                                    for {props.description}</p>
                                {
                                    props.votes.map((el, i) => {
                                        return (
                                            <div key={i} className={styles.Modal__Upvotes__Item}>
                                                <p>{el.user.name}</p>
                                                <img width='25px' height='25px' className={styles.Modal__Upvote__Like}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </section>
                        : null
                }
            </div>
        </>
    )
}

export const UpvoteLayout = (props) => {
    let {votes, url, description} = props;
    return (
        <div>
            <div className={styles.Feed__Card__Top_Description}>
                <a className={styles.Feed__Card__Top_Description_Text}
                   href={url}>{description}</a>
            </div>
            <div className={styles.Upvotes__List}>
                <UpvoteList description={description} votes={votes}/>
            </div>
        </div>
    )
}