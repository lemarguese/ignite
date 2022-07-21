import Link from "next/link";
import {useAuth} from "./config/authConfig/authProvider";

export default function Home() {

    const {getAuthToken} = useAuth();
    const authToken = getAuthToken();

    return (
        <ul>
            {
                 authToken ? <li>
                    <Link href='/feed'>
                        <a>Feed</a>
                    </Link>
                </li> : null
            }
            <li>
                <Link href='/login'>
                    <a>Login</a>
                </Link>
            </li>
            <li>
                <Link href='/signup'>
                    <a>Register</a>
                </Link>
            </li>
        </ul>
    )
}
