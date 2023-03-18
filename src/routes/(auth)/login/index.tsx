import { component$, useStore } from '@builder.io/qwik'
import { useAuthSignin } from '~/routes/plugin@auth'
import '../auth.css'

export default component$(() => {
    const store = useStore({
        email: '',
        password: '',
    })

    const signIn = useAuthSignin()

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
                <div class='form'>
                    <div class='inputWrapperFull'>
                        <input class='input' placeholder='Email' type='email' value={store.email} onInput$={(ev) => (store.email = (ev.target as HTMLInputElement).value)} />
                    </div>
                    <div class='inputWrapperFull'>
                        <input class='input' placeholder='Password' type='password' value={store.password} onInput$={(ev) => (store.password = (ev.target as HTMLInputElement).value)} />
                    </div>
                    <button
                        class='submitButton'
                        disabled={signIn.isRunning}
                    >
                        {signIn.isRunning ?
                            <span class='loading'>
                                <span />
                                <span />
                                <span />
                            </span>
                            : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    )
})