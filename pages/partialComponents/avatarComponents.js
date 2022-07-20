import styles from "../../styles/Feed.module.css";

export const Avatar = (props) => {
    return (
        <span>
            <div className={styles.Upvotes__Avatar}>
                <p>{props.firstLetter}</p>
            </div>
        </span>
    )
}

export const CardAvatar = () => {
    return (
        <div className={styles.Feed__Card__Avatar}>
            <img width='110px' height='110px' className={styles.Card__Image} alt=''/>
        </div>
    )
}