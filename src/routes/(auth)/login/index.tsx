import { component$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik'
import '../auth.css'

export default component$(() => {
    const csrfToken = useSignal<string>();
    const store = useStore({
        email: '',
        password: '',
    })

    useVisibleTask$(async () => {
        csrfToken.value = await fetch('/api/auth/csrf').then(
            async (res) => (await res.json()).csrfToken
        );
    });

    return (
        <div class='page'>
            <div class='formWrapper'>
                <div class='titles'>
                    <div class='title'>
                        Log in
                    </div>
                    <div class='subtitle'>
                        Don&#8217;t have an account?
                        <div class='link' onClick$={() => { window.location.replace('/signup') }}>
                            Sign up
                        </div>
                    </div>
                </div>
                <form method="post" action="/api/auth/callback/credentials" class='form'>
                    <input type="hidden" value={csrfToken.value} name="csrfToken" />
                    <div class='inputWrapperFull'>
                        <input class='input' placeholder='Email' type='text' name='username' value={store.email} onInput$={(ev) => (store.email = (ev.target as HTMLInputElement).value)} />
                    </div>
                    <div class='inputWrapperFull'>
                        <input class='input' placeholder='Password' type='password' name='password' value={store.password} onInput$={(ev) => (store.password = (ev.target as HTMLInputElement).value)} />
                    </div>
                    <button
                        class='submitButton'
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    )
})