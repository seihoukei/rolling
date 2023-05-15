import {onDestroy, onMount} from "svelte"
import Trigger from "utility/trigger.js"

export default function registerTrigger(...args) {
    let trigger = null
    onMount(() => {
        trigger = Trigger.on(...args)
    })
    onDestroy(() => {
        trigger?.cancel?.()
    })
}