import Link from "next/link";

export default function Home() {
    return (
        <ul>
            <li>
                <Link href='/feed'>
                    <a>Feed</a>
                </Link>
            </li>
            <li>
                <Link href='/login'>
                    <a>Login</a>
                </Link>
            </li>
            <li>
                <Link href='/register'>
                    <a>Register</a>
                </Link>
            </li>
        </ul>
    )
}
