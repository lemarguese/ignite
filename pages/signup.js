import styles from '../styles/Signup.module.css'
import {useState} from "react";
import {useAuth} from "./config/authConfig/authProvider";

const Signup = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const {signUp} = useAuth();

    const submitHandler = (e) => {
        e.preventDefault();
        signUp(formState);
        setFormState({
            name: '',
            email: '',
            password: '',
        });
    }

    return (
        <section className={styles.Signup__Section}>
            <form className={styles.Signup__Form} onSubmit={submitHandler}>
                <div className={styles.Signup__Logo__Title}>
                    <img width='50px' height='50px' className={styles.Logo}/>
                    <h1 className={styles.Signup__Title__Text}>Signup</h1>
                </div>
                <div className={styles.Signup__Input__Block}>
                    <input type='text' required placeholder='Name' value={formState.name} name='name' onChange={(e) =>
                        setFormState({...formState, name: e.target.value})}
                           className={styles.Signup__Input}/>
                </div>
                <div className={styles.Signup__Input__Block}>
                    <input type='text' required placeholder='Email' value={formState.email} name='email'
                           onChange={(e) =>
                               setFormState({...formState, email: e.target.value})}
                           className={styles.Signup__Input}/>
                </div>
                <div className={styles.Signup__Input__Block}>
                    <input type='password' required placeholder='Password' value={formState.password} name='password'
                           onChange={(e) =>
                               setFormState({...formState, password: e.target.value})}
                           className={styles.Signup__Input}/>
                </div>
                <div className={styles.Signup__Button__Block}>
                    <button type='submit' className={styles.Signup__Button}>Signup</button>
                </div>
            </form>
        </section>
    )
}

export default Signup;