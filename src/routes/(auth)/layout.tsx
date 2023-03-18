import { component$, Slot } from '@builder.io/qwik'
import './layout.css'

export default component$(() => {
    return (
        <div class='authLayout page'>
            <Slot />
        </div>
    )
})
