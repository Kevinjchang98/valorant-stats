import { useRouter } from 'next/router';
import { useState } from 'react';

const UsernameInput = () => {
    const router = useRouter();

    const runQuery = async (event: any) => {
        event.preventDefault();
        router.push(
            `/player/${event.target.username.value}/${event.target.tagline.value}`
        );
    };

    return (
        <div>
            <form onSubmit={runQuery}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    required
                />

                <label htmlFor="username">Tagline</label>
                <input
                    id="tagline"
                    type="text"
                    autoComplete="tagline"
                    required
                />

                <button type="submit">Go</button>
            </form>
        </div>
    );
};

export default UsernameInput;
